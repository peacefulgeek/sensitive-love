/**
 * Start With Cron — Render Start Command
 * Spawns the web server and the cron worker together
 * 
 * Usage: NODE_ENV=production node scripts/start-with-cron.mjs
 * 
 * Cron schedule: Mon-Fri at 12:00 UTC
 * After the initial 270 gated articles are exhausted (~54 days),
 * the cron generates 5 new articles per week (1 per weekday)
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

// Schedule cron: Mon-Fri at 12:00 UTC
function scheduleCron() {
  const now = new Date();
  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();
  const utcDay = now.getUTCDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat

  // Calculate ms until next Mon-Fri 12:00 UTC
  let targetDate = new Date(now);
  targetDate.setUTCHours(12, 0, 0, 0);

  // If it's already past 12:00 UTC today, or it's a weekend, find next weekday
  if (utcHour >= 12 || utcDay === 0 || utcDay === 6) {
    targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    // Skip to Monday if needed
    while (targetDate.getUTCDay() === 0 || targetDate.getUTCDay() === 6) {
      targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    }
  }

  const msUntilNext = targetDate.getTime() - now.getTime();
  const hoursUntil = (msUntilNext / 3600000).toFixed(1);

  console.log(`[cron] Next run: ${targetDate.toISOString()} (in ${hoursUntil}h)`);

  setTimeout(async () => {
    console.log("[cron] Triggering cron job...");
    try {
      const { runCronJob } = await import("./cron-worker.mjs");
      await runCronJob();
    } catch (err) {
      console.error("[cron] Job failed:", err);
    }
    // Schedule next run
    scheduleCron();
  }, msUntilNext);
}

console.log("[startup] Scheduling cron worker (Mon-Fri 12:00 UTC)...");
scheduleCron();

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
