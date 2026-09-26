# Agent plugins

这是我在个人项目中使用的 Codex 和 Claude Code 技能与 Hook 集合，按需收录自第三方项目。

## 来源

| 上游项目 | 本项目收录内容 |
| --- | --- |
| [Matt Pocock · Skills for Real Engineers](https://github.com/mattpocock/skills/blob/main/README.md) | 需求、建模、实现、调试与审查等工程技能 |
| [Dietrich Gebert · Ponytail](https://github.com/DietrichGebert/ponytail/blob/main/README.md) | 精简实现技能及 Codex、Claude Code Hook |
| [Julius Brussee · Caveman](https://github.com/JuliusBrussee/caveman/blob/main/README.md) | 表达、探索、审查等技能及随附脚本 |
| [Emil Kowalski · Skills for Designers and Engineers](https://github.com/emilkowalski/skills/blob/main/README.md) | 界面设计、动效、移动端交互与 Swift 技能 |
| [shadcn · shadcn/ui](https://github.com/shadcn-ui/ui/blob/main/README.md) | `shadcn` 技能及规则文档 |
| [wshobson · Agentic Plugin Marketplace](https://github.com/wshobson/agents/blob/main/README.md) | TypeScript、Python、Rust、Node.js、API 与 Tailwind 技能 |
| [Apollo GraphQL · Skills](https://github.com/apollographql/skills) | `rust-best-practices` 及参考章节 |
| [Addy Osmani · Agent Skills](https://github.com/addyosmani/agent-skills/blob/main/README.md) | 性能、接口、可观测性、迁移、审查、安全等技能及检查清单 |
| [Vercel Labs · Agent Skills](https://github.com/vercel-labs/agent-skills/blob/main/README.md) | React 组件组合与性能技能及规则文件 |
| [Supabase · Agent Skills](https://github.com/supabase/agent-skills/blob/main/README.md) | `supabase-postgres-best-practices` 及参考文件 |
| [Prisma · Skills](https://github.com/prisma/skills/blob/main/README.md) | Prisma ORM、Postgres、Compute 等技能及参考文件 |
| [Paul Bakaus · Impeccable](https://github.com/pbakaus/impeccable/blob/main/README.md) | `impeccable` 技能、参考手册及脚本 |
| [HumanLayer · Skills](https://github.com/humanlayer/skills) | `show-me` 可视化解释技能 |
| [Matteo Collina · Skills](https://github.com/mcollina/skills) | `fastify-best-practices` 技能及规则文档 |
| [GitHub · Awesome Copilot](https://github.com/github/awesome-copilot) | `multi-stage-dockerfile` 多阶段容器构建技能 |

第三方许可与署名保存在 `licenses/` 或对应技能的 `SKILL.md` 中。

## 使用与维护

技能保存在 `.agents/skills/`，由 `npx skills` 管理；`.claude/skills` 指向同一目录。`skills-lock.json` 记录安装来源，可在新环境恢复技能：

```sh
npx skills experimental_install
```

更新技能可运行 `npx skills update --project -y`。Ponytail Hook 脚本保存在 `.agents/hooks/`，`.codex/hooks` 和 `.claude/hooks` 指向同一目录；其来源是 [DietrichGebert/ponytail 的 `e3ba2aa` 提交](https://github.com/DietrichGebert/ponytail/tree/e3ba2aa6f1e6f0bc4d69eb09c9f0d0a93af56156)，需要单独同步。两端配置分别在 `.codex/hooks.json` 和 `.claude/settings.json`。

从项目根目录启动，并确保 `node` 在 `PATH` 中。Codex 还需信任项目配置和 `/hooks` 中的项目 Hook。修改技能或 Hook 后运行 `node scripts/verify.mjs` 验证。
