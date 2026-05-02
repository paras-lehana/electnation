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
- `apps/functions/src/server.test.ts` — health, CORS allow-list behavior, public-config secret absence, Forward Clinic demo classification, production reCAPTCHA-bypass origin checks, validation rejection, Calendar ICS, and YouTube SVEEP demo route.
- `apps/functions/src/services/forwardAnalysisService.test.ts` — Forward Clinic llm-service success, schema-drift normalization, official-source filtering, prompt boundaries, PII redaction before llm-service, and deterministic fallback behavior.
- `apps/functions/src/services/privacyRedaction.test.ts` — Aadhaar, EPIC, phone, email, PAN, and UPI-like redaction.
- `apps/functions/src/services/promptBoundary.test.ts` — untrusted user-input delimiter construction.
- `apps/functions/src/services/requestSecurity.test.ts` — production CORS/no-origin and reCAPTCHA bypass origin rules.
- `apps/functions/src/services/llmServiceClient.test.ts` — llm-service SMK/BYOK routing, auth header behavior, and sanitized upstream errors.

Latest local validation:

```bash
pnpm --filter @yatra/functions test  # passed, 24 backend tests
pnpm --filter @yatra/core test       # passed, 19 core tests
pnpm --filter @yatra/functions exec tsc --noEmit --pretty false  # passed
pnpm --filter @yatra/web exec tsc --noEmit --pretty false        # passed
pnpm type-check  # passed across all workspaces
pnpm test        # passed across all configured workspaces
pnpm build       # passed across all configured workspaces
```

Note: `apps/functions/src/server.test.ts` sets env vars before dynamically importing the app, so its `beforeAll` hook uses an explicit 30s timeout to avoid Windows/Vitest ESM transform startup flakes.

Latest browser smoke:

- `/easy-mode` renders large action tiles and read-aloud control.
- `/sanrakshan` renders vote-protection guidance and links to the practice scenario.
- `/play/scenario/vote-sanrakshan` advances, validates the correct safety answer, and awards +120 XP with the Vote Sanrakshak badge.
- `/clinic` and `ChatWidget` now share the typed browser API/SSE client used by the code-quality slice.
- Live `/clinic` returned `mode: llm-service`, official ECI source links, and redacted `[REDACTED_EPIC]` in the API response.
- Live no-Origin `/api/forward/analysis` returned `RECAPTCHA_REQUIRED`, while the same call with the deployed web `Origin` header succeeded.
- Mobile-sized `/clinic` and `/map` browser checks reported no horizontal overflow.

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
