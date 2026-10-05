#!/usr/bin/env bash
# SessionEnd hook: writes an overview of the session that just closed into llm-status/, via the session-overview
# skill in a `claude -p` (the closing session can't do it itself). The hook waits for the writer, so the session
# finishes closing only once the overview is written. The writer is still detached (nohup, own process group), so
# it survives a closed terminal window or the hook being killed at its timeout.
# - Skips sessions with fewer than MIN_PROMPTS real user prompts.
# - Condenses the transcript (prompts, replies, one line per tool call) so the writer reads kilobytes, not megabytes.
# - LLM_STATUS_WRITER marks the writer's own run, so its hooks don't start another writer.
# Log: $TMPDIR/llm-status-writer.log
set -euo pipefail

[ -n "${LLM_STATUS_WRITER:-}" ] && exit 0
MIN_PROMPTS=3
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
tmp="${TMPDIR:-/tmp}"
tmp="${tmp%/}"
log="$tmp/llm-status-writer.log"

input=$(cat)
transcript=$(jq -r '.transcript_path // empty' <<<"$input")
session=$(jq -r '.session_id // "unknown"' <<<"$input")
reason=$(jq -r '.reason // "unknown"' <<<"$input")
[ -n "$transcript" ] && [ -f "$transcript" ] || exit 0

# Real prompts: user messages with text (not tool results, not injected meta messages).
prompts=$(jq -c 'select(.type == "user" and (.isMeta | not))
  | .message.content
  | select(type == "string" or (type == "array" and any(.[]; .type == "text")))' "$transcript" | wc -l | tr -d ' ')
if [ "$prompts" -lt "$MIN_PROMPTS" ]; then
  echo "$(date '+%F %T') skip $session ($reason): $prompts prompt(s)" >>"$log"
  exit 0
fi

condensed="$tmp/llm-status-$session.md"
{
  echo "# Condensed transcript of session $session (closed: $reason)"
  echo
  jq -r '
    def clip(n): tostring | gsub("\\s+"; " ") | if length > n then .[0:n] + "…" else . end;
    if .type == "user" and (.isMeta | not) then
      .message.content
      | if type == "string" then "## User\n\(.)\n"
        else [ .[] | select(.type == "text") | .text ] | select(length > 0) | "## User\n\(join("\n"))\n" end
    elif .type == "assistant" then
      .message.content[]?
      | if .type == "text" and (.text | length) > 0 then "## Assistant\n\(.text)\n"
        elif .type == "tool_use" then
          "- tool `\(.name)`: \((.input.description // .input.file_path // .input.command // .input.path // .input.action // .input.skill // "") | clip(160))"
        else empty end
    else empty end
  ' "$transcript"
} >"$condensed"

claude_bin=$(command -v claude || echo "$HOME/.local/bin/claude")
prompt="Use the session-overview skill to write the overview of a finished Claude Code session in this repo. \
The session is over; its condensed transcript is at $condensed (user prompts, assistant replies, one line per tool call). \
Read that file fully, then write the overview into llm-status/ exactly as the skill says."

echo "$(date '+%F %T') start $session ($reason): $prompts prompts, $(wc -c <"$condensed" | tr -d ' ') bytes condensed" >>"$log"
# Waited on, but detached: `set -m` gives the background job its own process group, so signals sent to the hook's
# group miss it, and nohup makes it ignore SIGHUP.
set -m
cd "$root"
nohup env LLM_STATUS_WRITER=1 "$claude_bin" -p "$prompt" \
  --permission-mode acceptEdits \
  --allowedTools "Read" "Write" "Glob" "Bash(date:*)" "Bash(mkdir:*)" "Bash(ls:*)" "Bash(git status:*)" "Bash(git log:*)" \
  --no-session-persistence \
  >>"$log" 2>&1 </dev/null &
writer=$!
status=0
wait "$writer" || status=$?
echo "$(date '+%F %T') done $session: exit $status in ${SECONDS}s" >>"$log"
exit 0
