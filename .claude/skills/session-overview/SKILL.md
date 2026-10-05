---
name: session-overview
description: Write an overview of a Claude Code session to the llm-status folder (llm-status/YYYY-MM-DD-HHMM.md). Use when the user asks for a session overview, a status summary, or to document what was done in this session. It also runs automatically when a session in this repo closes: the SessionEnd hook passes a condensed transcript and waits for it before the close completes.
---

# Write a session overview

Write one markdown overview of a session into `llm-status/` at the repo root
(`./llm-status/` in the repo root, gitignored). A future session reads the newest one at startup,
so write for a reader who has none of this session's context.

## Where and how to name it

1. Create the folder if it's missing: `mkdir -p llm-status`.
2. Get the timestamp with `date "+%Y-%m-%d-%H%M"`. The file is `llm-status/<timestamp>.md`. If that file already
   exists, use `<timestamp>-2.md`, then `-3`, and so on. Never overwrite an overview.
3. Title: `# YYYY-MM-DD HH:MM — ngx-paper-ui session overview` (the same time, with a space and a colon).

## What to read first

- **The session itself.** When you're invoked in a live session, that's the conversation. When the close hook
  invoked you, it's the condensed transcript file named in your prompt, with user prompts, assistant replies and
  one line per tool call. Read all of it; it's the record of what happened.
- **The previous overview:** the newest file already in `llm-status/`. Use it for continuity: what was pending
  then, and whether it was done now.
- **The repo state, if git has commits:** `git status --short` and `git log --oneline -5`.

Don't invent anything. If the transcript doesn't show that something was verified, say it's unverified.

## Structure

```markdown
# YYYY-MM-DD HH:MM — ngx-paper-ui session overview

## Summary
Two to four sentences: the goal of the session and where it ended.

## What was done
| Change | Files | Verified how |
|---|---|---|

## Decisions and why
- The user's choices and their reasons, especially ones a later session could undo by accident.

## Current state
- What works now, with the commands that prove it (test counts, e2e, checks).

## Open issues / pending on the user
- Anything unfinished, failing, skipped, or waiting on the user (accounts, approvals, publishes).

## Next steps
1. Most useful next action first.

## Key files
| File | Why it matters |
|---|---|
```

Leave out a section that has nothing in it. Keep it under ~300 lines. Prefer tables and concrete paths, commands
and numbers over narrative. Refer to people by role, not by name or email.

When you're done, reply with the file path only (in a live session, one line with the path is enough).
