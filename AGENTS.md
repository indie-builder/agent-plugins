# Agent instructions

This repository maintains plugins for Codex and Claude Code. Read `README.md` before changing skill, hook, or MCP layout.

## GitHub workflow

- Use `gh` for GitHub repository, Issue, and PR operations; use `git` for local history.
- Before a GitHub write, confirm the target with `gh repo view` and check the current remote and branch.
- For routine changes, create a topic branch, review the diff, push it, and open a PR with `gh pr create`. Push directly to the default branch only when the user requests it.
- Merge or force-push only when the user explicitly requests it. Report the PR or commit URL after a GitHub write.

## Verification

- Prefer end-to-end checks. Run the full end-to-end check only after edits are complete, and leave a repeatable verification command or artifact.
- Never add unit tests after writing code. If isolated testing is necessary, list the ways the system could fail before writing that code.
- Run `node scripts/verify.mjs` after changes to skills or hooks.
