# SpiderCorp website

Vite + React site for [spidercorp.xyz](https://spidercorp.xyz). UI primitives come from **[Aeon UI](https://github.com/GenericCPU/aeon-ui)** (headless), not Ark.

## Aeon UI (local)

This app resolves `@aeon-ui/react` from a sibling clone (default: `~/AeonUI`). Override with:

```bash
export AEON_UI_ROOT=/path/to/AeonUI
```

Before `npm run build`, `prebuild` runs `aeon:ensure`, which builds `@aeon-ui/core`, `primitives`, and `react` if `dist/` is missing.

Manual build:

```bash
cd ~/AeonUI && pnpm run build:headless
```

Consumer guide (copy into other repos): `~/AeonUI/docs/VITE_CONSUMER.md`.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Ensure Aeon → social assets → production bundle |
| `npm run aeon:ensure` | Build Aeon headless packages when needed |

## Deploy (Vercel / CI)

Set `AEON_UI_ROOT` to the Aeon UI checkout path, or publish `@aeon-ui/*` to npm and switch `package.json` to semver deps (remove Vite aliases). See Aeon `PUBLISHING.md`.
