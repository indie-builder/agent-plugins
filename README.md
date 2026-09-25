# Agent plugins

这是面向 **Codex 和 Claude Code** 的项目级插件目录：按需收录第三方技能与 Hook，并维护两端可读取的配置。当前覆盖软件工程工作流、精简实现与代码审计、安全加固、界面设计与动效、React/Next.js 性能、TypeScript 高级类型、Python 与应用性能优化、Node.js 后端、API 设计、Postgres 实践、可观测性及系统迁移；尚未配置 MCP 服务，也未整仓镜像任何上游项目。

## 来源与能力

| 上游 README | 上游定位与本项目的能力 | 状态 |
| --- | --- | --- |
| [Matt Pocock · Skills for Real Engineers](https://github.com/mattpocock/skills/blob/main/README.md) | 小而可组合的工程工作流：需求澄清、领域建模、规格与任务拆解、实现、调试和代码审查。 | 已收录技能 |
| [Dietrich Gebert · Ponytail](https://github.com/DietrichGebert/ponytail/blob/main/README.md) | 优先复用现有代码、标准库和原生能力，减少过度设计；提供代码审查、全库审计及债务清单。 | 已收录技能和 Codex、Claude Code Hook |
| [Emil Kowalski · Skills for Designers and Engineers](https://github.com/emilkowalski/skills/blob/main/README.md) | 聚焦界面质感与动效：动画设计和审查、移动端交互、UI 组件选择，以及 Swift 开发指导。 | 已收录技能 |
| [wshobson · Agentic Plugin Marketplace](https://github.com/wshobson/agents/blob/main/README.md) | 上游覆盖后端、架构、安全等领域；本项目收录 TypeScript 高级类型、Python 性能优化、API 设计原则及指导 Express/Fastify 服务的 `nodejs-backend-patterns`。 | 已收录 4 项技能；未引入上游 Agent、命令或 Hook |
| [Addy Osmani · Agent Skills](https://github.com/addyosmani/agent-skills/blob/main/README.md) | 上游按需求、计划、构建、验证、评审和交付组织工程技能；本项目收录性能优化、API 与接口设计、可观测性、系统退役与迁移、代码简化、多维代码审查，以及覆盖输入、认证、依赖和隐私的 `security-and-hardening`。 | 已收录 7 项技能及各技能所需的检查清单；未引入上游命令、Agent 或 Hook |
| [Vercel Labs · Agent Skills](https://github.com/vercel-labs/agent-skills/blob/main/README.md) | 上游涵盖 Vercel 项目优化、React/Next.js 性能、Web 设计、写作与 React Native 等；本项目只收录按影响排序的 React/Next.js 性能规则 `vercel-react-best-practices`。 | 已收录 1 项技能及其规则文件 |
| [Supabase · Agent Skills](https://github.com/supabase/agent-skills/blob/main/README.md) | 上游提供覆盖 Supabase 产品的综合技能与 Postgres 实践；本项目只收录 `supabase-postgres-best-practices`，涵盖查询、连接、模式设计、锁、RLS 和监控。 | 已收录 1 项技能及其参考文件；未引入上游 MCP 或插件 |
| [Paul Bakaus · Impeccable](https://github.com/pbakaus/impeccable/blob/main/README.md) | 上游是一套面向 AI 的界面设计语言，提供核心技能、24 个设计命令、浏览器迭代和确定性设计检测；本项目只收录 `impeccable` 技能及其参考手册与脚本。 | 已收录 1 项技能；未启用独立插件、浏览器扩展或检测 Hook |

## 项目结构与使用

技能由 `npx skills` 管理，统一保存在 `.agents/skills/`；`.claude/skills` 指向同一目录。每项技能的附属参考资料保存在它自己的 `references/` 目录。

Ponytail 的 Hook 脚本保存在 `.agents/hooks/`，`.codex/hooks` 和 `.claude/hooks` 指向同一份脚本。Codex 读取 `.codex/hooks.json`，Claude Code 读取 `.claude/settings.json`。Ponytail 脚本取自 [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) 的 `e3ba2aa6f1e6f0bc4d69eb09c9f0d0a93af56156`。第三方许可保存在 `licenses/` 或对应技能的 `SKILL.md` 中。

```sh
npx skills add <owner/repo> --skill <name> --agent codex claude-code -y
npx skills list
npx skills update --project -y
npx skills remove <name> -y
```

`skills-lock.json` 记录项目安装来源；在新环境运行 `npx skills experimental_install` 可按记录恢复技能。该命令只更新技能，Ponytail Hook 脚本需要从上游单独同步。

Codex 从项目根目录启动后，在 `/hooks` 中检查并信任项目 Hook；项目配置也需要被 Codex 信任。本机已安装的全局 `ponytail@ponytail` 插件在本项目内关闭，避免重复注入。Claude Code 从项目根目录启动后会读取项目设置。两端都需要 `node` 在 `PATH` 中。目前没有需要配置的 MCP 服务；有实际服务时再按各自的项目契约添加配置。

从项目根目录运行 `node scripts/verify.mjs`，可检查技能安装及两端的 Ponytail Hook 流程。
