# TypeScript Domain Lab

一个用于 **5–20 分钟微练习** 的 TypeScript 训练仓库。

目标不是“刷完 TypeScript 语法”，而是把零散概念转化为真实工程中的类型设计能力。

## Training Model

每次练习遵循同一条链路：

```text
Requirement
↓
Domain Modeling
↓
Type Design
↓
Function / Behavior
↓
Edge Cases
↓
Reflection
```

一条 Linear Issue 对应一次独立练习。

例如：

```text
HAN-103
TS-01 · User / Role / Permission 建模
↓
src/ts-01-user-role-permission.ts
```

## Project Structure

```text
typescript-domain-lab/
├─ src/
│  ├─ ts-01-user-role-permission.ts
│  ├─ ts-02-api-response.ts
│  └─ ...
├─ .cursor/
│  ├─ rules/
│  │  └─ typescript-domain-lab.mdc
│  └─ skills/
│     └─ typescript-domain-lab/
│        └─ SKILL.md
├─ AGENTS.md
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Environment

推荐依赖：

```bash
npm install -D typescript tsx @types/node
```

推荐脚本：

```json
{
  "scripts": {
    "check": "tsc --noEmit"
  }
}
```

核心检查命令：

```bash
npm run check
```

本仓库优先验证 **类型设计是否成立**，而不是运行完整应用。

## TypeScript Policy

建议开启严格模式：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
```

暂时跳过：

- Decorators
- NestJS 元编程
- 复杂框架集成
- 为炫技而使用的高级类型

优先训练：

- Domain Modeling
- Generic
- Discriminated Union
- Narrowing
- `unknown`
- Type Guard
- `Result<T, E>`
- DTO / Mapping
- State / Event
- Workflow
- Agent Tool / Trace Domain

## Workflow

### 1. 从 Linear 取一题

只处理当前 Issue。

### 2. 创建对应 `.ts` 文件

例如：

```text
HAN-106
↓
src/ts-04-result.ts
```

### 3. 自己先完成第一版

在主动请求帮助前，优先自己完成：

- 类型
- 函数
- 调用示例
- 至少一个边界案例

### 4. Type Check

```bash
npm run check
```

类型错误是训练反馈，不要第一时间让 Agent 直接修复。

### 5. Agent Review

Agent 的角色是：

```text
Reviewer / Mentor
```

不是：

```text
Solution Generator
```

优先让 Agent：

- 指出类型漏洞
- 给提示
- 提反例
- 解释 compiler error
- Review 当前实现
- 追问设计理由

不要默认让 Agent：

- 直接写完整答案
- 直接重构成“最佳实践”
- 一次性替你完成 Acceptance Criteria

### 6. Reflection

每题完成前回答 Linear Issue 中的 Reflection。

重点回答：

```text
为什么这样设计？
这个类型阻止了什么错误？
还有什么非法状态能被表达？
放到真实项目里要怎么扩展？
```

### 7. Done

满足 Acceptance Criteria 后再把 Linear Issue 标记为 Done。

## Learning Rule

这个仓库衡量的不是代码量，而是：

> **能否从需求主动推导出类型设计。**

如果某题最终代码只有 20 行，但你已经能解释每个类型决策，这题就是有效训练。

## Main Project Relationship

```text
TypeScript Domain Lab
        ↓
短时专项训练
        ↓
类型设计能力
        ↓
ReAct_Agent_CLI
        ↓
真实 Agent 工程
```

当 ReAct_Agent_CLI 暴露某个 TS 弱点时，可以回到这里做针对性练习，再回主线项目应用。
