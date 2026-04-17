/**
 * Monthly Content Refresh — sensitive.love
 * Picks 10 oldest articles, refreshes via Anthropic, gates quality
 * Runs 1st of every month at 03:00 UTC
 * 
 * For static site: reads JSON data files, refreshes, writes back, pushes to GitHub
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

export async function refreshMonthly() {
  console.log('[refresh-monthly] Starting monthly content refresh...');
  
  const categories = ['the-science', 'the-nervous-system', 'the-world', 'the-gift', 'the-practice'];
  let allArticles = [];
  
  for (const cat of categories) {
    const filePath = path.join(DATA_DIR, `articles-${cat}.json`);
    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      allArticles.push(...data.map(a => ({ ...a, _file: filePath, _cat: cat })));
    } catch { continue; }
  }
  
  // Sort by date ascending (oldest first), take 10
  allArticles.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const batch = allArticles.slice(0, 10);
  
  let refreshed = 0;
  
  for (const article of batch) {
    const original = article.bodyHtml;
    let newBody = original;
    let passed = false;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const prompt = `You are Kalesh, a consciousness teacher and writer. Refresh this article while keeping its core message, structure, and Amazon affiliate links intact. The article is about: "${article.title}".

HARD RULES:
- Never use these words: ${AI_FLAGGED_WORDS.slice(0, 30).join(', ')}
- Never use these phrases: ${AI_FLAGGED_PHRASES.slice(0, 15).join('; ')}
- Never use em-dashes. Use ... or - or ~ instead
- Keep ALL existing Amazon links exactly as they are (href, tag, paid link label)
- Keep word count between 1200-2500 words
- Use contractions naturally (you're, it's, don't, I've)
- Include 2+ conversational interjections (Here's the thing, Look, Honestly, Truth is)
- Vary sentence length: mix short punchy sentences (3-6 words) with longer flowing ones
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
        console.warn(`[refresh-monthly] ${article.slug} attempt ${attempt}:`, gate.failures.join(' | '));
      } catch (err) {
        console.error(`[refresh-monthly] ${article.slug} attempt ${attempt} error:`, err.message);
      }
    }
    
    if (passed) {
      // Update the article in its category file
      const filePath = article._file;
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
      const idx = data.findIndex(a => a.slug === article.slug);
      if (idx >= 0) {
        data[idx].bodyHtml = newBody;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        refreshed++;
        console.log(`[refresh-monthly] Refreshed: ${article.slug}`);
      }
    } else {
      console.error(`[refresh-monthly] ${article.slug} FAILED gate 3x - keeping original`);
    }
    
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`[refresh-monthly] Done. Refreshed ${refreshed}/${batch.length} articles.`);
  
  // Push to GitHub if any were refreshed
  if (refreshed > 0 && GH_PAT) {
    try {
      const { execSync } = await import('child_process');
      execSync('git add -A && git commit -m "Monthly content refresh" && git push', {
        cwd: path.resolve(__dirname, '..'),
        env: { ...process.env, GIT_AUTHOR_NAME: 'Cron Bot', GIT_AUTHOR_EMAIL: 'cron@sensitive.love' },
        stdio: 'pipe'
      });
      console.log('[refresh-monthly] Pushed to GitHub');
    } catch (e) {
      console.error('[refresh-monthly] Git push failed:', e.message);
    }
  }
}
