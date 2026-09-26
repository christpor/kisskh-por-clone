# AGENTS.md — KissKH Clone Context Router

> **Core Mandate:** This is an authentic 1:1 pixel-accurate frontend clone of [kisskh.do](https://kisskh.do). Maintain zero-emoji UI, exact Material dark styling, and dual-layer API resilience.

## ⚡ Quick Navigation
- **Architecture & API Deep Dive:** [`context/AGENT.md`](context/AGENT.md)
- **Non-Negotiable Architecture Invariants:** [`context/LAWS.md`](context/LAWS.md)
- **Verified Post-Mortems:** [`.learnings/errors/`](.learnings/errors/)
- **Live Deployment:** [https://kisskh-por-clone.vercel.app](https://kisskh-por-clone.vercel.app)
- **GitHub Repository:** [https://github.com/christpor/kisskh-por-clone](https://github.com/christpor/kisskh-por-clone)

## 🛠️ Commands
```bash
bun install            # Install dependencies (< 5s)
bun run dev            # Start local dev server with /api proxy (port 5173)
bun run build          # Production build check (exit code must be 0)
NO_UPDATE_NOTIFIER=1 vercel --prod --yes  # Production deployment
```

## 룰 Rules of Engagement
1. **Ponytail Lazy Dev Rule:** Never add external npm dependencies when native web APIs or Tailwind utilities suffice.
2. **Deterministic Build Gate:** Never mark a task done without `bun run build` exiting with code 0.
3. **Referrer Isolation:** Never remove `<meta name="referrer" content="no-referrer">` or the `vercel.json` Referrer-Policy header; it breaks image loading from TMDB and external CDNs.
4. **Git Hygiene:** Never run `git add -A` without checking `.gitignore`; keep `node_modules/` and screenshot blobs out of Git.
