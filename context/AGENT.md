# Agent Brain — KissKH Clone Architecture & Operations

## 🏛️ System Overview
Single-page application (SPA) built with React 19, TypeScript, Tailwind CSS, and Lenis kinetic motion. It mirrors `kisskh.do` with pixel-perfect fidelity, backed by a dual-tier live proxy + offline snapshot engine.

## 📡 Upstream Endpoints & Proxy Topology
KissKH origin (`https://kisskh.do`) is protected by Cloudflare. Direct browser client requests fail with CORS.
- **Local Dev:** `vite.config.ts` proxies `/api` ➔ `https://kisskh.do` with spoofed `Referer: https://kisskh.do/` and `Origin: https://kisskh.do`.
- **Production (Vercel):** `vercel.json` rewrites `/api/(.*)` ➔ `https://kisskh.do/api/$1` and wildcard `/(.*)` ➔ `/index.html` (SPA routing).
- **Core Endpoints:**
  - `/api/DramaList/Show`: Spotlight hero carousel items (`Between Steps`, `The Love Hypothesis`).
  - `/api/DramaList/MostView?ispc=true&c=2`: Top K-Drama (*Perfect Crown*, *Twinkling Watermelon*).
  - `/api/DramaList/MostView?ispc=true&c=1`: Top C-Drama (*Revenged Love*, *The First Frost*).
  - `/api/DramaList/LastUpdate?page=1&type=0`: Latest episode releases.
  - `/api/DramaList/TopRating?ispc=true`: Hollywood blockbusters.
  - `/api/DramaList/MostSearch?ispc=true`: 8 Popular Search trending cards.
  - `/api/DramaList/Drama/:id`: Full drama synopsis, cast, and episode arrays.

## 🖼️ CDN Anti-Hotlink Defense
Thumbnails originate from `media.themoviedb.org`, `serveproxy.com`, and `kissimge1.site`. These hosts block referrers outside their domain.
- **Required:** `<meta name="referrer" content="no-referrer">` in `index.html` + `Referrer-Policy: no-referrer` in `vercel.json`. Never remove.

## 🎬 Real Movie Streaming Bridge
Real KissKH video stream links follow this formula in `src/utils/kisskh.ts`:
`https://kisskh.do/Drama/${cleanTitle}?id=${id}&ep=${epId}&page=0&pageSize=100`
- Both `DramaDetailPage.tsx` and `WatchPage.tsx` expose direct buttons (`Real KissKH Movie ↗`) to open the live stream on KissKH.

## 🧭 Directory Structure
- `src/components/`: Modular UI primitives (`Navbar`, `HeroCarousel`, `DramaRail`, `DramaCard`, `SearchModal`, `ThemeModal`, `AuthModal`).
- `src/pages/`: Full views (`HomePage`, `ExplorePage`, `DramaDetailPage`, `WatchPage`, `FAQPage`, `RequestPage`).
- `src/data/mock-kisskh.json`: 41KB bundled snapshot ensuring zero-latency initial paint and offline fallback.
- `src/services/api.ts`: API service with 3s timeout and automatic fallback.

## 📌 LAST SESSION HANDOFF (2026-09-26)
**Built & Verified:**
- Complete 1:1 clone of `kisskh.do` matching all desktop & mobile user screenshots.
- Full-width search drawer with 5 filter pills and 8 `MostSearch` cards.
- Live Vercel production deployment: `https://kisskh-por-clone.vercel.app` (HTTP 200).
- Public GitHub repository: `https://github.com/christpor/kisskh-por-clone` (commit `f259967`).
**Next Session / Adaptations:**
- To add a custom HLS transcoder or scrape full video stream m3u8 playlists, implement a Cloudflare Worker or Node.js proxy to evaluate `_0x54b991` token generation.
- To persist user favorites and watch history to cloud, bind Supabase or Firebase Auth in `src/components/AuthModal.tsx`.
