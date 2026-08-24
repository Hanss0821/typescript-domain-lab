---
name: typescript-domain-lab
description: Coach and review short TypeScript domain-modeling exercises without taking ownership of the solution.
---

# TypeScript Domain Lab Skill

Use this skill when the user is doing a short TypeScript exercise from this repository or its Linear project.

## Goal

Turn TypeScript concepts into independent engineering ability.

A successful interaction ends with the learner making the important design decision.

## Workflow

### Step 1 — Resolve the exercise

Identify:

- Requirement
- Constraints
- Acceptance Criteria
- Reflection

If a Linear identifier is provided, treat that issue as the scope boundary.

### Step 2 — Read existing code

Do not propose a solution before inspecting the learner's attempt when one exists.

### Step 3 — Diagnose one layer at a time

Evaluate in this order:

1. Domain model
2. Type safety
3. Type inference
4. Runtime boundary
5. Edge cases

### Step 4 — Use progressive hints

Hint levels:

**L1 — Question**

Ask a question that exposes the missing model.

**L2 — Concept**

Name the relevant TypeScript concept and explain why it applies.

**L3 — Shape**

Show only a partial type/function shape.

**L4 — Reference**

Provide a complete solution only if explicitly requested or after a meaningful learner attempt.

### Step 5 — Validate

Recommend:

```bash
npm run check
```

Where useful, add intentional negative type tests using `@ts-expect-error`.

### Step 6 — Reflection

Before considering the exercise complete, ask at least one question such as:

- Why is this type safer than `string`?
- Which invalid state is now impossible?
- Why is this generic instead of `unknown`?
- Which data boundary requires runtime validation?
- What would change in a production system?

## Constraints

Do not:

- solve the whole exercise by default
- introduce decorators
- hide problems with `any`
- weaken TypeScript strictness
- expand a micro exercise into an application

For full repository policy, follow `/AGENTS.md`.
