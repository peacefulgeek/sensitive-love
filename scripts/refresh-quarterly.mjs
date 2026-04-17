/**
 * Quarterly Deep Refresh — sensitive.love
 * Picks 20 oldest articles for deeper rewrite with quality gate
 * Runs 1st of Jan, Apr, Jul, Oct at 04:00 UTC
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { runQualityGate, AI_FLAGGED_WORDS, AI_FLAGGED_PHRASES } from './lib/article-quality-gate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'client', 'src', 'data');

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const GH_PAT = process.env.GH_PAT;

async function callAnthropic(prompt) {
  if (!ANTHROPIC_KEY) throw new Error('ANTHROPIC_API_KEY not set');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content[0].text;
}

export async function refreshQuarterly() {
  console.log('[refresh-quarterly] Starting quarterly deep refresh...');
  
  const categories = ['the-science', 'the-nervous-system', 'the-world', 'the-gift', 'the-practice'];
  let allArticles = [];
  
  for (const cat of categories) {
    const filePath = path.join(DATA_DIR, `articles-${cat}.json`);
    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      allArticles.push(...data.map(a => ({ ...a, _file: filePath, _cat: cat })));
    } catch { continue; }
  }
  
  allArticles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const batch = allArticles.slice(0, 20);
  
  let refreshed = 0;
  
  for (const article of batch) {
    const original = article.bodyHtml;
    let newBody = original;
    let passed = false;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const prompt = `You are Kalesh, a consciousness teacher and writer. Do a deep refresh of this article - update research references, add new insights, improve flow and readability. Keep the core message but make it feel freshly written.

Title: "${article.title}"
Category: ${article._cat}

HARD RULES:
- Never use these words: ${AI_FLAGGED_WORDS.slice(0, 30).join(', ')}
- Never use these phrases: ${AI_FLAGGED_PHRASES.slice(0, 15).join('; ')}
- Never use em-dashes. Use ... or - or ~ instead
- Keep ALL existing Amazon links exactly as they are
- Keep word count between 1200-2500 words
- Use contractions naturally (you're, it's, don't, I've)
- Include 3+ conversational interjections (Here's the thing, Look, Honestly, Truth is)
- Vary sentence length dramatically: short punchy (3-6 words) mixed with long flowing ones
- Write in second person (you/your) with some first person (I/my)
- Return ONLY the refreshed HTML body, no wrapper tags

Current article body:
${original}`;

        newBody = await callAnthropic(prompt);
        const gate = runQualityGate(newBody);
        
        if (gate.passed) {
          passed = true;
          break;
        }
        console.warn(`[refresh-quarterly] ${article.slug} attempt ${attempt}:`, gate.failures.join(' | '));
      } catch (err) {
        console.error(`[refresh-quarterly] ${article.slug} attempt ${attempt} error:`, err.message);
      }
    }
    
    if (passed) {
      const filePath = article._file;
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const idx = data.findIndex(a => a.slug === article.slug);
      if (idx >= 0) {
        data[idx].bodyHtml = newBody;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        refreshed++;
        console.log(`[refresh-quarterly] Refreshed: ${article.slug}`);
      }
    } else {
      console.error(`[refresh-quarterly] ${article.slug} FAILED gate 3x - keeping original`);
    }
    
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`[refresh-quarterly] Done. Refreshed ${refreshed}/${batch.length} articles.`);
  
  if (refreshed > 0 && GH_PAT) {
    try {
      const { execSync } = await import('child_process');
      execSync('git add -A && git commit -m "Quarterly deep refresh" && git push', {
        cwd: path.resolve(__dirname, '..'),
        env: { ...process.env, GIT_AUTHOR_NAME: 'Cron Bot', GIT_AUTHOR_EMAIL: 'cron@sensitive.love' },
        stdio: 'pipe'
      });
      console.log('[refresh-quarterly] Pushed to GitHub');
    } catch (e) {
      console.error('[refresh-quarterly] Git push failed:', e.message);
    }
  }
}
