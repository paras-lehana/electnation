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

## Scripts

```bash
pnpm test          # vitest all workspaces
pnpm test:watch    # watch mode
pnpm e2e           # playwright headed
pnpm e2e:ci        # chromium headless
pnpm a11y          # axe on localhost:3000
pnpm lighthouse    # LHCI against preview deploy
```

## CI

GitHub Actions runs lint → type-check → unit → integration → build on
every push. E2E + Lighthouse run on `main` and PR labels. Coverage
uploaded to Codecov.

## Fixtures

- `fixtures/forwards.json` — 30 real-looking WhatsApp forwards (safe / misleading / fake) for classifier regression.
- `fixtures/quizzes.json` — 40 scenario questions across 4 personas for quiz engine golden tests.
- Firebase emulator seeded via `scripts/seed-emulator.ts`.
