#!/usr/bin/env bash
# Prints every relative .md link in wiki/ whose target doesn't exist, as "page -> target", and exits 1 if there are
# any. Skips wiki/raw/ and wiki/CLAUDE.md (its example links are written from a subfolder's point of view).
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"
broken=0
while read -r page; do
  while read -r target; do
    [ -n "$target" ] || continue
    [ -e "$(dirname "$page")/$target" ] || { echo "$page -> $target"; broken=1; }
  done < <(grep -oE '\]\([^)#]+\.md' "$page" | sed 's/^](//' | grep -vE '^https?:' || true)
done < <(find wiki -name '*.md' -not -path 'wiki/raw/*' -not -name CLAUDE.md)
exit "$broken"
