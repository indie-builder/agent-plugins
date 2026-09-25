import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));
const codex = read('.codex/hooks.json').hooks;
const claude = read('.claude/settings.json').hooks;
const lock = read('skills-lock.json').skills;
const installed = JSON.parse(execFileSync('npx', ['--yes', 'skills', 'list', '--json'], { cwd: root, encoding: 'utf8' }));
const ponytail = Object.keys(lock).filter((name) => lock[name].source === 'dietrichgebert/ponytail');

assert.equal(ponytail.length, 6);
assert(Object.keys(lock).every((name) => installed.some((item) => item.name === name && item.scope === 'project')));
for (const name of ['typescript-advanced-types', 'python-performance-optimization', 'api-design-principles']) {
  assert.equal(lock[name]?.source, 'wshobson/agents');
}
for (const name of ['performance-optimization', 'api-and-interface-design', 'observability-and-instrumentation']) {
  assert.equal(lock[name]?.source, 'addyosmani/agent-skills');
}
assert.equal(lock['vercel-react-best-practices']?.source, 'vercel-labs/agent-skills');
assert.equal(lock['supabase-postgres-best-practices']?.source, 'supabase/agent-skills');
assert(existsSync(join(root, '.agents/skills/supabase-postgres-best-practices/references/query-missing-indexes.md')));
assert(!('prototype' in lock));
for (const name of ['matt-prototype', 'emil-prototype']) {
  assert(installed.some((item) => item.name === name && item.scope === 'project'));
}
assert(!installed.some((item) => item.name === 'prototype' && item.scope === 'project'));
for (const kind of ['skills', 'hooks']) {
  assert.equal(realpathSync(join(root, '.claude', kind)), realpathSync(join(root, '.agents', kind)));
}
assert.equal(realpathSync(join(root, '.claude/references')), realpathSync(join(root, '.agents/references')));
for (const host of ['.agents', '.claude']) {
  for (const [skill, checklist] of [
    ['performance-optimization', 'performance-checklist.md'],
    ['observability-and-instrumentation', 'observability-checklist.md'],
  ]) {
    assert(existsSync(join(root, host, 'skills', skill, '../../references', checklist)));
  }
}
assert.equal(realpathSync(join(root, '.codex/hooks')), realpathSync(join(root, '.agents/hooks')));

const codexState = join(root, '.codex/.ponytail-data');
assert(!existsSync(codexState), 'Refusing to replace active Codex hook state');
const claudeState = mkdtempSync(join(tmpdir(), 'ponytail-claude-'));
const env = { ...process.env, CLAUDE_PROJECT_DIR: root, CLAUDE_CONFIG_DIR: claudeState, PONYTAIL_DEFAULT_MODE: 'full' };

function run(config, event, input = {}) {
  const command = config[event][0].hooks[0].command;
  const result = spawnSync('sh', ['-c', command], {
    cwd: root,
    env,
    input: JSON.stringify(input),
    encoding: 'utf8',
    timeout: 5000,
  });
  assert.equal(result.status, 0, `${event}: ${result.stderr}`);
  return result.stdout;
}

try {
  assert.match(JSON.parse(run(codex, 'SessionStart')).hookSpecificOutput.additionalContext, /PONYTAIL MODE ACTIVE — level: full/);
  assert.match(JSON.parse(run(codex, 'UserPromptSubmit', { prompt: '/ponytail lite' })).hookSpecificOutput.additionalContext, /PONYTAIL MODE CHANGED — level: lite/);
  assert.match(JSON.parse(run(codex, 'SubagentStart')).hookSpecificOutput.additionalContext, /PONYTAIL MODE ACTIVE — level: lite/);

  assert.match(run(claude, 'SessionStart'), /PONYTAIL MODE ACTIVE — level: full/);
  assert.match(run(claude, 'UserPromptSubmit', { prompt: '/ponytail lite' }), /PONYTAIL MODE CHANGED — level: lite/);
  assert.match(JSON.parse(run(claude, 'SubagentStart')).hookSpecificOutput.additionalContext, /PONYTAIL MODE ACTIVE — level: lite/);
  console.log(`Verified ${Object.keys(lock).length} locked skills, both prototype aliases, and both Ponytail hook flows`);
} finally {
  rmSync(codexState, { recursive: true, force: true });
  rmSync(claudeState, { recursive: true, force: true });
}
