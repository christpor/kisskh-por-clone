## Pattern: System Prompt Bloat During Multi-Agent Policy Synchronization
## Root Cause: Attempting to sync policy rules by copy-pasting full markdown rule blocks into individual agent system prompts inflates input token costs across every single turn.
## Prevention: Keep agent system prompts under 30 lines; use dense, authoritative pointers to the canonical profile (`~/.agent-profile/WORKFLOW.md` and steering rules) instead of duplicating text.
## Score delta: 7/10 → 9/10
## Project: Kiro CLI / Global Agent Profile Architecture
