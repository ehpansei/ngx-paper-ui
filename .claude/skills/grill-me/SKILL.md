---
name: grill-me
description: Grill the user relentlessly about a plan, design, or new request until every decision is settled, before any code is written. Use when the user says "grill me" or asks to stress-test an idea, and whenever the per-prompt grill-me hook flags a new request.
---

Adapted from Matt Pocock's `grilling` skill (github.com/mattpocock/skills).

## When to grill

Grill a **new request**: a feature, component, refactor, design question, release or sync step. Don't grill:

- answers to your previous round, confirmations or follow-ups ("yes", "continue", "try again", "go");
- clearly mechanical requests (run the tests, fix a typo, show a file, rename X to Y). Say in one line why you're
  skipping and just do it;
- prompts starting with `no grill`.

When unsure, grill with a single short round rather than skipping.

## How to grill

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision
branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions
you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each
question and give your recommended answer. Then wait for the user's answers before the next round.

**Ask each round with the `AskUserQuestion` tool**, not as plain text, so the user answers by picking from the prompt:

1. **Context first, in text.** Before the tool call, write a short numbered briefing (Q1, Q2 …) with the evidence
   behind each question: file paths, line numbers, trade-offs. The prompt itself has little room, so the reasoning
   goes here.
2. **One tool call per round**, with up to 4 questions. If the frontier has more than 4, ask the 4 most fundamental
   now and the rest in the next round.
3. **Each question:**
   - `header`: a chip of 12 characters or fewer, e.g. "Q1 Goal";
   - `question`: one sentence that ends in "?";
   - 2–4 distinct `options`, each with a `description` giving the consequence of choosing it;
   - put your recommended answer **first**, with " (Recommended)" at the end of its label;
   - use `multiSelect: true` only when the choices really aren't exclusive;
   - use `preview` to compare concrete code or config side by side.
4. **Don't add an "Other" option.** The tool adds one automatically, so an open-ended answer is always possible.
5. **Record the answers.** After the answers come back, briefly restate what's now settled (and any notes the user
   added), then recompute the frontier.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that
depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question
still open in this round belongs to a _later_ round, not this one.

## Facts are yours, decisions are theirs

Finding _facts_ is your job, never the user's. Look them up yourself: read files directly, and use an Explore agent
only for broad sweeps. Don't ask the user anything you could find in the repo.

Ground recommendations in repo evidence: `libs/ui/CLAUDE.md` (library rules), the root `CLAUDE.md` gotchas, the
design-system sync contract, existing components. Be critical: if the user's idea conflicts with how the repo works,
say so and cite the file. Don't just agree.

The _decisions_ are the user's: put each to them and wait.

## Done

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently
assumed. Give a short summary of what was decided, then wait for the user to confirm before editing anything.
