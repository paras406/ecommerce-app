---
name: development
description: >-
  Guides feature development with requirements gathering, approved plans,
  and Next.js performance checks. Use when implementing features, pages,
  or non-trivial UI/workflow changes in this ecommerce app.
---

# Development

## 1. Requirements
- Ask when unclear; do not assume product or UX details
- Capture functional + non-functional requirements and discuss edge cases

## 2. Plan (non-trivial work)
- Outline approach, files/areas touched, and subtasks
- Wait for approval; revise until agreed
- For large work, get approval per subtask before continuing
- Skip this for small unambiguous fixes

## 3. Implement
- Follow project rules (RSC for server data, Redux for client state, shared vs route components)
- Prefer `next/image` (priority above the fold) and `next/font`
- Preconnect to the primary API when fetches are on the critical path
- Avoid memory leaks; keep bundles lean (dynamic import only when it helps)
- Virtualise long product listings: render only the items in the viewport plus a small buffer, recycling off-screen items instead of keeping the full list mounted

## 4. Done
- Summarize what shipped and any follow-ups
