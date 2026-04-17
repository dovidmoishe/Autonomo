# Autonomo Monorepo

This repository contains:

- `apps/web`: Next.js frontend (App Router, TypeScript, Tailwind)
- `apps/api`: NestJS backend API (TypeScript)

## Requirements

- Node.js 20+
- npm 10+

## Run Locally

Install dependencies:

```bash
cd /Users/mac/codes/solana-frontier/apps/web && npm install
cd /Users/mac/codes/solana-frontier/apps/api && npm install
```

Start frontend:

```bash
cd /Users/mac/codes/solana-frontier
npm run dev:web
```

Start backend:

```bash
cd /Users/mac/codes/solana-frontier
npm run dev:api
```

## Useful Scripts

From repo root:

```bash
npm run build:web
npm run build:api
npm run lint:web
npm run lint:api
npm run test:api
```
