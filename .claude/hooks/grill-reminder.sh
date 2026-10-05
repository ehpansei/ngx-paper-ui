#!/usr/bin/env bash
# UserPromptSubmit hook: reminds Claude to run the grill-me skill on new requests.
# Silent for slash commands, prompts starting with "no grill", and inside the background overview writer.
set -euo pipefail

[ -n "${LLM_STATUS_WRITER:-}" ] && exit 0
prompt=$(jq -r '.prompt // ""')
trimmed="${prompt#"${prompt%%[![:space:]]*}"}"
lower=$(printf '%s' "$trimmed" | tr '[:upper:]' '[:lower:]')

case "$lower" in
  /* | "no grill"*) exit 0 ;;
esac

jq -n '{
  hookSpecificOutput: {
    hookEventName: "UserPromptSubmit",
    additionalContext: "grill-me: if this prompt is a new request (not an answer to your questions, a confirmation, or a mechanical task), run the grill-me skill before doing anything else."
  }
}'
