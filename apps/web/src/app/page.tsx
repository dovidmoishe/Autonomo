export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center gap-8 px-6 py-20 sm:px-10">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-zinc-950">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Autonomo
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Next.js + NestJS starter is ready.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Frontend lives in <code>apps/web</code> and the backend API lives in{" "}
          <code>apps/api</code>. You can now plug in Solana wallet flows,
          strategy logic, and protocol integrations.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-zinc-700 dark:text-zinc-200">
          <code className="rounded-md bg-zinc-100 px-3 py-2 dark:bg-zinc-900">
            npm run dev:web
          </code>
          <code className="rounded-md bg-zinc-100 px-3 py-2 dark:bg-zinc-900">
            npm run dev:api
          </code>
        </div>
      </div>
    </main>
  );
}
