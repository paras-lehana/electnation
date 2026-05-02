# Testing

Election Yatra uses layered validation so civic education, API safety,
accessibility, and browser flows can be checked independently before deployment.

## Layers

| Layer | Tool | Location | Current status |
| --- | --- | --- | --- |
| Unit | Vitest | `packages/core/src/**/*.test.ts`, `apps/functions/src/services/**/*.test.ts` | 49 core/API tests passing |
| Component | React Testing Library + Vitest | `apps/web/components/**/*.test.tsx`, `apps/web/lib/**/*.test.ts` | 7 web tests passing |
| Integration | Supertest + Vitest | `apps/functions/src/server.test.ts` | API route, CORS, config, calendar, map, chat, TTS, translation tests passing |
| E2E | Playwright | `e2e/*.spec.ts` | 15 Chromium tests passing |
| Accessibility | axe-core + Playwright | `e2e/a11y.spec.ts` | 9 core routes passing with color contrast enabled |
| Performance | Next build | `pnpm build` | Production build passing |

## Scripts

```bash
pnpm type-check   # build shared core, then TypeScript-check all packages
pnpm test         # core, functions, and web Vitest suites
pnpm build        # production build across all workspaces
pnpm e2e:ci       # Chromium Playwright browser suite
pnpm a11y         # axe-core scan across 9 core routes
```

Focused scripts are also available:

```bash
pnpm test:unit
pnpm test:api
pnpm test:web
pnpm e2e
pnpm e2e:headed
```

## Current Verified Coverage

- `packages/core/src/result.test.ts` — Result helpers.
- `packages/core/src/schemas.test.ts` — chat, forward-analysis, output, and calendar schemas.
- `packages/core/src/google/geminiClient.test.ts` — Chunav Saathi prompt neutrality, official-source guidance, Hindi/easy-language adaptation, and audio-first behavior.
- `packages/core/src/google/mapsClient.test.ts` — geocoding and distance-matrix wrapper mapping.
- `apps/functions/src/services/forwardAnalysisService.test.ts` — llm-service success, schema-drift normalization, official-source filtering, prompt boundaries, PII redaction, and deterministic fallback behavior.
- `apps/functions/src/services/privacyRedaction.test.ts` — Aadhaar, EPIC, phone, email, PAN, and UPI-like redaction.
- `apps/functions/src/services/promptBoundary.test.ts` — untrusted user-input delimiter construction.
- `apps/functions/src/services/requestSecurity.test.ts` — production CORS/no-origin and reCAPTCHA bypass origin rules.
- `apps/functions/src/services/llmServiceClient.test.ts` — llm-service SMK/BYOK routing, auth headers, and sanitized upstream errors.
- `apps/functions/src/server.test.ts` — health, public config redaction, chat SSE, invalid payloads, production reCAPTCHA bypass origin checks, Calendar ICS/template links, map errors, TTS validation, translation validation, and YouTube SVEEP demo route.
- `apps/web/components/ui/Button.test.tsx` — accessible button rendering, click forwarding, and disabled state.
- `apps/web/components/ui/ChatWidget.test.tsx` — dialog open, typed question submission, streamed token rendering, and safe fallback messaging.
- `apps/web/components/ui/Stepper.test.tsx` — labelled Yatra journey and active-step semantics.
- `apps/web/lib/progress.test.ts` — local XP/badge ledger and malformed storage recovery.
- `e2e/*.spec.ts` — onboarding, Forward Clinic, map fallback, Easy Mode, Vote Sanrakshan scenario, Yatra station flow, Chunav Saathi chat, and axe accessibility scans.

## Latest Local Validation

```bash
pnpm type-check  # passed across core, functions, and web
pnpm test        # passed: 19 core + 30 functions + 7 web tests
pnpm build       # passed across core, functions, and web
pnpm e2e:ci      # passed: 15 Chromium tests
pnpm a11y        # passed: 9 routes, color contrast enabled
```

Note: Playwright runs with one worker locally to keep the Next.js dev server stable on Windows during route compilation and browser teardown.

## Browser Coverage

- `/` homepage axe scan.
- `/easy-mode` action tiles and read-aloud control.
- `/sanrakshan` axe scan and Vote Sanrakshan route coverage through Play.
- `/clinic` suspicious-forward analysis with official-source guidance.
- `/play/scenario/vote-sanrakshan` correct safety answer, XP claim, duplicate-claim guard, and badge state.
- `/map` official polling booth and ERO lookup cards with map fallback.
- `/pwd` native audio/transcript page axe scan.
- `/yatra` EPIC station validation and Chunav Saathi streamed answer.

## Remaining Test Gaps

- Lighthouse CI budgets are still planned for the final preview deployment.
- VoiceOver and TalkBack manual smoke should be repeated after each public UI release.
- Coverage thresholds are not enforced yet; the current suite favors high-risk civic, security, and accessibility behavior first.
