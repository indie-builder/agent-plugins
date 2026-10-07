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
| [HumanLayer · Skills](https://github.com/humanlayer/skills) | `show-me` 可视化解释技能、`visual-pr` 拉取请求描述技能 |
| [Matteo Collina · Skills](https://github.com/mcollina/skills) | `fastify-best-practices` 技能及规则文档 |
| [GitHub · Awesome Copilot](https://github.com/github/awesome-copilot) | `multi-stage-dockerfile` 多阶段容器构建技能 |
| [Lieflat Charts](https://github.com/larashero3-dotcom/lieflat-charts) | `lieflat-charts` HTML 图表与报告技能 |
| [EverMind AI · Raven](https://github.com/EverMind-AI/Raven) | `git-story-film` Git 历史动画影片技能 |
| [alesha-pro · Tools](https://github.com/alesha-pro/tools) | `hand-drawn-canvas-animation` 手绘 Canvas 动画技能 |
| [Cursor · Plugins](https://github.com/cursor/plugins) | `create-verification-skill`、`maintain-verification-skill` 项目验证技能生成与维护 |
| [echris6 · Motion Video Kit](https://github.com/echris6/motion-video-kit) | `business-motion-film` 商业短片制作、动效与质量检查技能 |
| [Warp · Common Skills](https://github.com/warpdotdev/common-skills/blob/main/README.md) | `skill-doctor` 技能评分与改进建议 |
| [Kit Langton · Skills](https://github.com/kitlangton/skills) | `effect` Effect v4 生产 TypeScript 技能及参考文档 |
| [backnotprop · bro](https://github.com/backnotprop/bro/blob/main/README.md) | `bro`、`clean-room`、`facts`、`ladder`、`readback`、`recap`、`status` 七项沟通与状态展示技能；该仓库暂无 LICENSE 文件 |
| [Jakub Krehel · Skills](https://github.com/jakubkrehel/skills/blob/main/README.md) | `better-interface`、`better-ui`、`better-typography`、`better-colors`、`better-accessibility`、`better-layout`、`better-writing`、`interface-review`、`explain-interface`、`break`、`build-design`、`state-machine`、`variant` 十三项界面设计技能（MIT 许可） |

第三方许可与署名保存在 `licenses/` 或对应技能的 `SKILL.md` 中。

## 使用与维护

技能保存在 `.agents/skills/`，由 `npx skills` 管理；`.claude/skills` 指向同一目录。`skills-lock.json` 记录安装来源，可在新环境恢复技能：

```sh
npx skills experimental_install
```

更新技能可运行 `npx skills update --project -y`。Ponytail Hook 脚本保存在 `.agents/hooks/`，`.codex/hooks` 和 `.claude/hooks` 指向同一目录；其来源是 [DietrichGebert/ponytail 的 `e3ba2aa` 提交](https://github.com/DietrichGebert/ponytail/tree/e3ba2aa6f1e6f0bc4d69eb09c9f0d0a93af56156)，需要单独同步。两端配置分别在 `.codex/hooks.json` 和 `.claude/settings.json`。

从项目根目录启动，并确保 `node` 在 `PATH` 中。Codex 还需信任项目配置和 `/hooks` 中的项目 Hook。修改技能或 Hook 后运行 `node scripts/verify.mjs` 验证。

本地技能 `harness-code-check` 用于检查恒等分支、吞错、硬编码密钥、测试覆盖率和僵尸文件、模块、API。使用 `$harness-code-check` 调用，默认检查并报告，不自动修复；它不属于第三方来源锁定项。
