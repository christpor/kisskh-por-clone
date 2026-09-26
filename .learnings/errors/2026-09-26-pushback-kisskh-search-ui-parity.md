## Pattern: Search UI Divergence & External Stream Link Omission
## Root Cause: Defaulted to generic floating modal dialog instead of inspecting the authentic full-width header slide search and MostSearch API endpoint from kisskh.do, and lacked a 1-click bridge to the authentic streaming host.
## Prevention: Always trigger and screenshot auxiliary navigation overlays (Search, Drawer, Theme) on the reference site before building modal components, and wire real outbound streaming URLs for all media items.
## Score delta: 6/10 → 9/10
## Project: kisskh-clone
