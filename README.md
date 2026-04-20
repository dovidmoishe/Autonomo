# Autonomo Monorepo

This repository contains:

- `apps/web`: Next.js frontend (App Router, TypeScript, Tailwind)
- `apps/api`: NestJS backend API (TypeScript)

## Requirements

- Node.js 20+
- pnpm 10+

## Run Locally

Install dependencies from repo root:

```bash
cd /Users/mac/codes/solana-frontier
pnpm install
```

Start frontend:

```bash
cd /Users/mac/codes/solana-frontier
pnpm run dev:web
```

Start backend:

```bash
cd /Users/mac/codes/solana-frontier
pnpm run dev:api
```

## Useful Scripts

From repo root:

```bash
pnpm run build:web
pnpm run build:api
pnpm run lint:web
pnpm run lint:api
pnpm run test:api
```
