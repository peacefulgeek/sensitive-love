# The Empowered Sensitive

Evidence-based guidance for highly sensitive people.

## Deploy on Render

- **Build Command:** `pnpm install && pnpm build`
- **Start Command:** `NODE_ENV=production node scripts/start-with-cron.mjs`
- **Environment:** Node
- **Auto-Deploy:** On push to main

### Env vars (set in Render dashboard):
- `ANTHROPIC_API_KEY` — Claude API key (for auto-gen)
- `FAL_KEY` — FAL.ai key (for image generation)
- `GH_PAT` — GitHub PAT (for auto-gen commits)
- `NODE_ENV=production`

### Auto-Gen Pipeline
Set `AUTO_GEN_ENABLED = true` in `scripts/generate-articles.mjs` when ready.
Cron runs Mon-Fri at 12:00 UTC, generating 1 article per weekday (5/week).

## Domain
Target: sensitive.love

