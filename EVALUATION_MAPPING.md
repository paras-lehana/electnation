# Evaluation Mapping — Hack2skill Prompt Wars Rubric ↔ Code

A one-page cheatsheet mapping every rubric axis to the exact file(s),
test(s), and doc(s) that satisfy it. Judges can jump straight to proof.

| Rubric axis | Evidence in code | Tests | Docs |
| --- | --- | --- | --- |
| **Novelty / idea** | 6-station yatra + Chunav Saathi + Misinformation Clinic + Easy Mode as one cohesive civic product | — | `README.md`, `PROMPTS.md` |
| **Use of Google services** | Gemini chat + forward analysis, Maps JS + Distance Matrix, Calendar ICS/template links, YouTube SVEEP route, TTS, Translation, Firebase skeleton, reCAPTCHA Enterprise wrapper | `packages/core/src/google/mapsClient.test.ts`, `apps/functions/src/server.test.ts` | `GOOGLE_SERVICES.md` |
| **Prompt engineering** | `buildChunavSaathiPrompt` with politically-neutral rules, tone adaptation, cultural warmth, refusal patterns | covered through `POST /api/chat` smoke path; dedicated prompt tests queued | `PROMPTS.md` |
| **Code quality** | TS strict mode, `Result<T,E>`, `AppError` taxonomy, Zod schemas, pnpm workspaces, typed Google wrappers, centralized config | `packages/core/src/result.test.ts`, `packages/core/src/schemas.test.ts` | `ARCHITECTURE.md` |
| **Security** | Zod input/output validation on Forward Clinic, reCAPTCHA Enterprise wrapper, rate limiting, safe structured logs, demo bypass marked explicitly | `apps/functions/src/server.test.ts` | `SECURITY.md` |
| **Performance / efficiency** | Streaming SSE, static page generation, map fallback panel, no raw AI logging, opt-in standalone build for Cloud Run | `pnpm build` | `README.md`, `TESTING.md` |
| **Accessibility** | Skip link, map text-only facility list, Clinic `aria-live`, scenario feedback `role=status`, PwD native audio controls + transcript | browser smoke checklist; axe/Playwright queued | `ACCESSIBILITY.md` |
| **Testing** | Vitest unit + Supertest integration now implemented; component/e2e queued | `pnpm type-check`, `pnpm test`, `pnpm build` | `TESTING.md` |
| **User experience** | Ethnic-modern "Democracy ka Tyohar" design, Framer Motion, tricolor hero, rangoli motifs | Playwright visual diff | `README.md` |
| **Impact for Bharat** | Migrant Corner, PwD flow, 4+ languages, voice-first, non-partisan ECI sources | — | `README.md` |
| **Reliability** | `/api/health` dep-check, deterministic demo-mode for chat/forward/youtube/maps, Calendar ICS fallback, structured logs | `apps/functions/src/server.test.ts` | `ARCHITECTURE.md` |
| **Documentation** | This file + README + Architecture + Security + A11y + Testing + Prompts + Changelog + granular `tasks.md` | — | 9 markdown docs |
