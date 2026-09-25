# Agent instructions

This repository maintains plugins for Codex and Claude Code. Read `README.md` before changing skill, hook, or MCP layout.

## Skill name collisions

- Keep Matt Pocock's `prototype` as `.agents/skills/matt-prototype` and Emil Kowalski's `prototype` as `.agents/skills/emil-prototype`. Their upstream paths are [Matt's `skills/engineering/prototype`](https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype) and [Emil's `skills/prototype`](https://github.com/emilkowalski/skills/tree/d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128/skills/prototype).
- Sync these two aliases manually. Preserve each local folder name and `SKILL.md` frontmatter name; preserve Matt's `agents/openai.yaml` display name. `npx skills update` does not update them, and neither alias belongs in `skills-lock.json`.

## Bundled references

- Keep Addy Osmani's performance, observability, and code-review checklists inside each skill's `references/` directory. After `npx skills update`, copy the checklists from the upstream root `references/` into the affected skills and restore their `SKILL.md` links to `references/<checklist>.md`.

## GitHub workflow

- Use `gh` for GitHub repository, Issue, and PR operations; use `git` for local history.
- Before a GitHub write, confirm the target with `gh repo view` and check the current remote and branch.
- For routine changes, create a topic branch, review the diff, push it, and open a PR with `gh pr create`. Push directly to the default branch only when the user requests it.
- Merge or force-push only when the user explicitly requests it. Report the PR or commit URL after a GitHub write.

## Verification

- Prefer end-to-end checks. Run the full end-to-end check only after edits are complete, and leave a repeatable verification command or artifact.
- Never add unit tests after writing code. If isolated testing is necessary, list the ways the system could fail before writing that code.
- Run `node scripts/verify.mjs` after changes to skills or hooks.
