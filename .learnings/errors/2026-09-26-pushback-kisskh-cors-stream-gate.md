## Pattern: Unmitigated CORS & Video Obfuscation in Client-Side Clone
## Root Cause: Planned direct browser client API calls and naive video playback against Cloudflare-protected kisskh.do without configuring local dev proxy, header spoofing (Referer/Origin), or resilient local mock fallback.
## Prevention: When cloning protected streaming/SPA platforms, mandate a local dev proxy (Vite server proxy with changeOrigin & rewrite), explicit image referer-policy, and embedded iframe/HLS fallback pipeline before plan signoff.
## Score delta: 6/10 → 9/10
## Project: kisskh-clone
