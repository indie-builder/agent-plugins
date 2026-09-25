# Agent plugins

本项目维护 Codex 和 Claude Code 的技能、Hook 与 MCP 配置。技能由 `npx skills` 管理，统一保存在 `.agents/skills/`；`.claude/skills` 指向同一目录。

Ponytail 的 Hook 脚本保存在 `.agents/hooks/`，`.codex/hooks` 和 `.claude/hooks` 指向同一份脚本。Codex 读取 `.codex/hooks.json`，Claude Code 读取 `.claude/settings.json`。Ponytail 脚本取自 [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) 的 `e3ba2aa6f1e6f0bc4d69eb09c9f0d0a93af56156`。第三方许可保存在 `licenses/`。

```sh
npx skills add <owner/repo> --skill <name> --agent codex claude-code -y
npx skills list
npx skills update --project -y
npx skills remove <name> -y
```

`skills-lock.json` 记录项目安装来源；在新环境运行 `npx skills experimental_install` 可按记录恢复技能。该命令只更新技能，Ponytail Hook 脚本需要从上游单独同步。

`prototype` 已由 Matt Pocock 的技能占用。Emil Kowalski 的同名技能以 `emil-prototype` 保存在 `.agents/skills/`；它取自 [emilkowalski/skills](https://github.com/emilkowalski/skills) 的 `d16ebe60d09a5ba2afcb7054ede9d0a10c9f6128`，需要单独同步，`npx skills update` 不会更新这个改名副本。

Codex 从项目根目录启动后，在 `/hooks` 中检查并信任项目 Hook；项目配置也需要被 Codex 信任。本机已安装的全局 `ponytail@ponytail` 插件在本项目内关闭，避免重复注入。Claude Code 从项目根目录启动后会读取项目设置。两端都需要 `node` 在 `PATH` 中。目前没有需要配置的 MCP 服务；有实际服务时再按各自的项目契约添加配置。

从项目根目录运行 `node scripts/verify.mjs`，可检查技能安装及两端的 Ponytail Hook 流程。
