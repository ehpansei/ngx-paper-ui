#!/usr/bin/env bash
# Prints the session records not yet ingested into wiki/, one repo-relative path per line: files in llm-status/,
# plans/ and the repo root (except README.md and CLAUDE.md) with no "source: <path>" line in wiki/log.md.
# Used by /wiki status and the SessionStart hook. Prints nothing when wiki/log.md doesn't exist.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"
[ -f wiki/log.md ] || exit 0
for f in llm-status/*.md plans/*.md *.md; do
  [ -f "$f" ] || continue
  case "$f" in README.md | CLAUDE.md) continue ;; esac
  grep -qF "source: $f" wiki/log.md || echo "$f"
done
