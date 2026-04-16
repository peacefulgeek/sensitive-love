/**
 * Start With Cron — Render Start Command
 * Spawns the web server and all cron workers together
 * 
 * Usage: NODE_ENV=production node scripts/start-with-cron.mjs
 * 
 * Cron schedules:
 * - Article generation: Mon-Fri at 12:00 UTC (5/week)
 * - Product spotlight: Wednesdays at 14:00 UTC (1/week)
 * - Product refresh: Sundays at 06:00 UTC (1/week) — checks all ASINs for dead links
 */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Start the web server
console.log("[startup] Starting web server...");
const server = spawn("node", [path.join(PROJECT_ROOT, "dist/index.js")], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

server.on("error", (err) => {
  console.error("[startup] Server error:", err);
  process.exit(1);
});

// Generic cron scheduler
function scheduleWeekly({ name, targetDays, targetHourUTC, importPath, runFn }) {
  function schedule() {
    const now = new Date();
    let targetDate = new Date(now);
    targetDate.setUTCHours(targetHourUTC, 0, 0, 0);

    // If past target time today or not a target day, advance
    if (now >= targetDate || !targetDays.includes(targetDate.getUTCDay())) {
      targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      while (!targetDays.includes(targetDate.getUTCDay())) {
        targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      }
      targetDate.setUTCHours(targetHourUTC, 0, 0, 0);
    }

    const msUntilNext = targetDate.getTime() - now.getTime();
    const hoursUntil = (msUntilNext / 3600000).toFixed(1);

    console.log(`[${name}] Next run: ${targetDate.toISOString()} (in ${hoursUntil}h)`);

    setTimeout(async () => {
      console.log(`[${name}] Triggering...`);
      try {
        const mod = await import(importPath);
        if (runFn && mod[runFn]) {
          await mod[runFn]();
        }
      } catch (err) {
        console.error(`[${name}] Job failed:`, err);
      }
      // Schedule next run
      schedule();
    }, msUntilNext);
  }
  schedule();
}

// 1. Article generation: Mon-Fri at 12:00 UTC
console.log("[startup] Scheduling article generation (Mon-Fri 12:00 UTC)...");
scheduleWeekly({
  name: "article-gen",
  targetDays: [1, 2, 3, 4, 5], // Mon-Fri
  targetHourUTC: 12,
  importPath: "./cron-worker.mjs",
  runFn: "runCronJob",
});

// 2. Product spotlight: Wednesdays at 14:00 UTC
console.log("[startup] Scheduling product spotlight (Wed 14:00 UTC)...");
scheduleWeekly({
  name: "product-spotlight",
  targetDays: [3], // Wednesday
  targetHourUTC: 14,
  importPath: "./product-spotlight.mjs",
  runFn: "runProductSpotlight",
});

// 3. Product refresh: Sundays at 06:00 UTC
console.log("[startup] Scheduling product refresh (Sun 06:00 UTC)...");
scheduleWeekly({
  name: "product-refresh",
  targetDays: [0], // Sunday
  targetHourUTC: 6,
  importPath: "./product-refresh.mjs",
  runFn: "runProductRefresh",
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("[startup] SIGTERM received. Shutting down...");
  server.kill("SIGTERM");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("[startup] SIGINT received. Shutting down...");
  server.kill("SIGINT");
  process.exit(0);
});
