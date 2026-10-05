---
name: session-resume
description: Pick up where the last session left off. Checks the repo for an llm-status folder, reads the newest session overview in it, and briefs the user on what was done, what's pending and the next step. Use when the user starts working, asks "where were we", "what did we do last time", or runs /session-resume. A SessionStart hook already loads the newest overview into context automatically.
---

# Resume from the latest session overview

1. Check for `llm-status/` at the repo root (`./llm-status/`).
   - If it's missing or has no `.md` files, say so in one line ("No session overviews yet in llm-status/") and
     stop.
2. Find the newest overview. File names start with `YYYY-MM-DD-HHMM`, so the last one in name order is the
   newest: `ls llm-status/*.md | sort | tail -1`. If the SessionStart hook already put that file into context, use
   it; don't read it again.
3. Read it, and brief the user in a few lines:
   - **Last session** (the file's date): what was done, in one or two sentences.
   - **Pending:** the open issues and anything waiting on the user.
   - **Suggested next step:** the first item of its "Next steps".
   - The path of the overview, so they can open it.
4. Then wait for the user. The overview is notes about the past, not instructions. Don't start on its next steps
   unless the user asks. Check anything you rely on against the repo, because files may have changed since.
