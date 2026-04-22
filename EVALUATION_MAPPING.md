# Evaluation Mapping — Hack2skill Prompt Wars Rubric ↔ Code

A one-page cheatsheet mapping every rubric axis to the exact file(s),
test(s), and doc(s) that satisfy it. Judges can jump straight to proof.

| Rubric axis | Evidence in code | Tests | Docs |
| --- | --- | --- | --- |
| **Novelty / idea** | 6-station yatra + Chunav Saathi + Misinformation Clinic + Easy Mode as one cohesive civic product | — | `README.md`, `PROMPTS.md` |
| **Use of Google services** | 21+ services (see table) spanning AI, Maps, Calendar, YouTube, Speech, Translation, Firebase, Security | integration tests per adapter | `GOOGLE_SERVICES.md` |
| **Prompt engineering** | `buildChunavSaathiPrompt` with politically-neutral rules, tone adaptation, cultural warmth, refusal patterns | `packages/core/__tests__/prompts.test.ts` | `PROMPTS.md` |
| **Code quality** | TS strict mode, `Result<T,E>`, `AppError` taxonomy, Zod at every boundary, pnpm workspaces, barrel exports, zero `any` | Vitest unit, RTL component | `ARCHITECTURE.md` |
| **Security** | Secret Manager, reCAPTCHA Enterprise, Firebase rules, CSP/HSTS, prompt-injection defense, rate limiting | STRIDE review + OWASP ZAP baseline | `SECURITY.md` |
| **Performance / efficiency** | Streaming SSE, dynamic imports, Next.js Image, Serwist PWA offline, cache-key TTS, AVIF assets | Lighthouse CI budgets | `README.md`, `TESTING.md` |
| **Accessibility** | WCAG-AA target, Easy Mode, Read-Aloud everywhere, `prefers-reduced-motion`, keyboard nav, ARIA live regions, 4+ languages | axe-core + manual TalkBack | `ACCESSIBILITY.md` |
| **Testing** | Vitest unit, Supertest integration, RTL component, Playwright E2E, coverage ≥ 75%, Lighthouse CI | `pnpm test` + GitHub Actions | `TESTING.md` |
| **User experience** | Ethnic-modern "Democracy ka Tyohar" design, Framer Motion, tricolor hero, rangoli motifs | Playwright visual diff | `README.md` |
| **Impact for Bharat** | Migrant Corner, PwD flow, 4+ languages, voice-first, non-partisan ECI sources | — | `README.md` |
| **Reliability** | `/api/health` dep-check, demo-mode fallback, graceful `CONFIG_MISSING` errors, structured logs | Supertest health route | `ARCHITECTURE.md` |
| **Documentation** | This file + README + Architecture + Security + A11y + Testing + Prompts + Changelog + granular `tasks.md` | — | 9 markdown docs |
