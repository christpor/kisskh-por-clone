# LAWS.md — Codebase Invariants & Non-Negotiable Rules

Any modification to this repository must preserve these 5 invariant laws:

## 1. The Zero-403 Referrer Invariant
All posters and video thumbnails are served by external CDNs (`media.themoviedb.org`, `serveproxy.com`, `kissimge1.site`) with strict hotlinking filters.
- **Law:** `index.html` MUST declare `<meta name="referrer" content="no-referrer">`, and `vercel.json` MUST inject `Referrer-Policy: no-referrer`. If either is removed, image loading drops immediately.

## 2. The Dual-Layer Fallback Invariant
The frontend must render immediately with zero network latency on first paint.
- **Law:** `src/pages/HomePage.tsx` and `src/components/SearchModal.tsx` MUST initialize their state with bundled data from `src/data/mock-kisskh.json`. The live API via `api.ts` background-syncs afterwards. If offline or Cloudflare blocked, the UI never displays empty error states.

## 3. The Origin Proxy Invariant
Cloudflare drops browser XHR from `localhost` and non-whitelisted origins.
- **Law:** Never call `https://kisskh.do/api` directly from client code. Always call `/api/DramaList/...` and let `vite.config.ts` (dev) or `vercel.json` (prod) rewrite with spoofed `Referer` and `Origin` headers.

## 4. The SPA Wildcard Rewrite Invariant
Because the application uses HTML5 History API routing (`/Drama/:id`, `/Watch/:id/:ep`, `/List`, `/FAQ`):
- **Law:** `vercel.json` MUST maintain the fallback rewrite `{"source": "/(.*)", "destination": "/index.html"}`. Never delete it, or direct browser refreshes will return HTTP 404.

## 5. The Zero-Slop Anti-Emoji Invariant
KissKH is an elegant Asian drama portal with material elevation.
- **Law:** Never insert emojis (`🔥`, `🚀`, `✨`, `🎬`) into navigation buttons, headers, or cards. Use `lucide-react` icons (stroke 1.5) or authentic SVG assets.
