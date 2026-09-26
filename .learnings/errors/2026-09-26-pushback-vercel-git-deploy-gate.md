## Pattern: Untracked .gitignore & Missing Vercel SPA Rewrites
## Root Cause: Attempting to deploy and push to GitHub without creating .gitignore (causing node_modules to enter git index) and omitting vercel.json rewrites + Referrer-Policy headers.
## Prevention: Always enforce .gitignore hygiene before git init/add, and mandate vercel.json with SPA rewrites ("/(.*) -> /index.html") and Referrer-Policy before Vercel deployments.
## Score delta: 5/10 → 9/10
## Project: kisskh-clone
