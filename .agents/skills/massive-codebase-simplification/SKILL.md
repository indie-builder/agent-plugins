---
name: massive-codebase-simplification
description: Execute a repository-wide, behavior-preserving simplification campaign with a substantial net LOC reduction, clearer module boundaries, consolidated helpers, and finished PRs. Use when the user asks for a full codebase overhaul rather than a local refactor or read-only audit.
---

# Massive codebase simplification

Finish the whole requested simplification campaign. Treat a stated reduction target, such as 30%, as an acceptance criterion, not a suggestion. Make routine design and PR-splitting decisions yourself; deliver one reviewable PR or a coherent series of PRs according to repository rules.

## Establish the baseline

1. Read repository instructions and trace the build, test, and runtime entry points. Map public interfaces, callers, side effects, error paths, and the largest files before editing. Record the existing verification results, including pre-existing failures.
2. Freeze a reproducible LOC baseline at the starting commit. Count tracked, handwritten source and test code across the requested repository; list excluded generated, vendored, minified, and lock files. Use the **same file-selection rule** on the final tree, counting new and moved files. Record production and test LOC separately as well as their combined total. File moves alone do not reduce LOC; deleting useful tests does not count as simplification.
3. Identify the largest confirmed sources of excess: dead code, duplicate implementations, pass-through layers, unnecessary dependencies, tangled routing, and files with multiple responsibilities. Trace uses and history before deleting or unifying behavior. Rank changes by net reduction and comprehension gain, with regression risk alongside them.

Baseline is complete when another developer can rerun the LOC count and verification commands and can see which behavior each major cut must preserve.

## Simplify end to end

- Delete proven dead code and redundant layers first. Reuse existing helpers or standard and platform facilities where they fit. Consolidate genuinely equivalent behavior at its shared ownership point; retain distinct cases when their contracts differ.
- Break oversized files at real responsibility boundaries. Move cohesive behavior together, keep the call graph easy to follow, and avoid replacing one god file with a maze of tiny wrappers.
- Replace repeated conditional routing with the smallest clear dispatch or control flow that preserves precedence, defaults, errors, and ordering. Prefer legibility over compressed syntax or LOC gaming.
- Work in buildable, reviewable increments. Choose one PR when its diff remains understandable; otherwise use a dependency-ordered PR series. Each PR should have a coherent purpose and its own verification evidence. Keep unrelated feature changes out of the campaign.
- Preserve externally observable behavior: APIs, CLI output, persistence formats, ordering, side effects, failure modes, compatibility, security, and performance constraints. Compare with the baseline using existing tests and relevant end-to-end flows. Add only focused characterization checks where an important behavior lacks proof; do not weaken useful tests to make a refactor pass.

Continue through the full scope without asking the user to choose routine implementation details. If a candidate cut harms behavior or clarity, revert that cut and find another route to the target.

## Prove and deliver

After edits are complete, run the repository's full relevant verification and compare it with the baseline. Review the complete diff for leftover duplication, broken imports, accidental behavior changes, and whether the new module boundaries make the code easier to navigate. Recount LOC with the frozen rule:

`reduction = (baseline LOC - final LOC) / baseline LOC`

The campaign is complete only when the requested net reduction is met **across the final combined result**, oversized files have been addressed, behavior checks pass or pre-existing failures are clearly distinguished, and the final structure is demonstrably easier to understand. Do not add percentages from separate PRs or claim a target met from a subset of the repository.

Follow repository Git and GitHub instructions to push the topic branch or branches and open the PR or PR series. In each PR, provide the baseline and final LOC counts, reduction, notable structural changes, verification commands and results, and any remaining known risk. Give the user the PR links. A PR is delivery; merge only with separate authorization.

If a genuine external blocker prevents completion, preserve the finished work and report the measured shortfall, blocker, and exact remaining work. Do not call a partial reduction complete.
