# Testing

## Layers

| Layer | Tool | Location | Coverage target |
| --- | --- | --- | --- |
| Unit | Vitest | `packages/core/__tests__/**/*.test.ts`, `apps/*/src/**/*.test.ts` | ≥ 85% in `core` |
| Component | React Testing Library + Vitest | `apps/web/components/**/*.test.tsx` | 100% of interactive UI |
| Integration | Supertest + Firebase emulator | `apps/functions/__tests__/**.test.ts` | every route: happy + 2 error paths |
| E2E | Playwright | `e2e/*.spec.ts` | onboarding, yatra, clinic, quiz |
| Accessibility | axe-core + Playwright | `e2e/a11y.spec.ts` | 0 violations on every route |
| Performance | Lighthouse CI | `.lighthouserc.json` | Perf ≥ 90, A11y 100, PWA ≥ 90 |

## Implemented Scripts

```bash
pnpm test          # vitest all workspaces
pnpm type-check    # build shared core, then TypeScript-check all packages
pnpm build         # production build (set NEXT_STANDALONE=true for Cloud Run standalone output)
```

## Current Verified Coverage

- `packages/core/src/result.test.ts` — Result helpers.
- `packages/core/src/schemas.test.ts` — chat, forward-analysis, output, and calendar schemas.
- `packages/core/src/google/geminiClient.test.ts` — Chunav Saathi prompt neutrality, official-source, Hindi/easy-language, and audio-first rules.
- `packages/core/src/google/mapsClient.test.ts` — geocoding and distance-matrix wrapper mapping.
- `apps/functions/src/server.test.ts` — health, Forward Clinic demo classification, validation rejection, Calendar ICS, and YouTube SVEEP demo route.

Latest local validation:

```bash
pnpm type-check  # passed
pnpm test        # 24 tests passed
pnpm build       # passed; standalone output is opt-in on Windows
```

Latest browser smoke:

- `/easy-mode` renders large action tiles and read-aloud control.
- `/sanrakshan` renders vote-protection guidance and links to the practice scenario.
- `/play/scenario/vote-sanrakshan` advances, validates the correct safety answer, and awards +120 XP with the Vote Sanrakshak badge.

## Planned Browser/E2E Scripts

```bash
pnpm e2e           # playwright headed
pnpm e2e:ci        # chromium headless
pnpm a11y          # axe on localhost:3000
pnpm lighthouse    # LHCI against preview deploy
```

## CI

CI is queued next: lint → type-check → unit → integration → build on every push.
E2E + Lighthouse should run on the final deployed preview.

## Fixtures

- `fixtures/forwards.json` — 30 real-looking WhatsApp forwards (safe / misleading / fake) for classifier regression.
- `fixtures/quizzes.json` — 40 scenario questions across 4 personas for quiz engine golden tests.
- Firebase emulator seeded via `scripts/seed-emulator.ts`.
