# Evaluation Mapping — Hack2skill Prompt Wars Rubric ↔ Code

A one-page cheatsheet mapping every rubric axis to the exact file(s),
test(s), and doc(s) that satisfy it. Judges can jump straight to proof.

| Rubric axis | Evidence in code | Tests | Docs |
| --- | --- | --- | --- |
| **Novelty / idea** | 6-station yatra + Chunav Saathi + Misinformation Clinic + Easy Mode as one cohesive civic product | — | `README.md`, `PROMPTS.md` |
| **Use of Google services** | Gemini chat + forward analysis, Maps JS + Distance Matrix, Calendar ICS/template links, YouTube SVEEP route, TTS, Translation, Firebase skeleton, reCAPTCHA Enterprise wrapper | `packages/core/src/google/mapsClient.test.ts`, `apps/functions/src/server.test.ts` | `GOOGLE_SERVICES.md` |
| **Prompt engineering** | `buildChunavSaathiPrompt` with politically-neutral rules, tone adaptation, cultural warmth, refusal patterns, and untrusted-input boundaries | `packages/core/src/google/geminiClient.test.ts`, `apps/functions/src/services/promptBoundary.test.ts`, `apps/functions/src/services/forwardAnalysisService.test.ts` | `PROMPTS.md`, `SECURITY.md` |
| **Code quality** | TS strict mode, `Result<T,E>`, `AppError` taxonomy, Zod schemas, pnpm workspaces, typed Google wrappers, centralized config, Forward Clinic service extraction, centralized browser API/SSE client | `packages/core/src/result.test.ts`, `packages/core/src/schemas.test.ts`, `apps/functions/src/services/forwardAnalysisService.test.ts`, direct `tsc --noEmit` for web/functions | `ARCHITECTURE.md`, `TESTING.md` |
| **Security** | Zod input/output validation, PII redaction before AI, prompt-injection boundaries, official-source filtering, sanitized llm-service errors, CORS allow-list, production-scoped reCAPTCHA bypass, rate limiting, safe structured logs | `apps/functions/src/services/privacyRedaction.test.ts`, `apps/functions/src/services/requestSecurity.test.ts`, `apps/functions/src/services/llmServiceClient.test.ts`, `apps/functions/src/services/forwardAnalysisService.test.ts`, `apps/functions/src/server.test.ts` | `SECURITY.md` |
| **Performance / efficiency** | Streaming SSE, static page generation, map fallback panel, no raw AI logging, opt-in standalone build for Cloud Run | `pnpm build` | `README.md`, `TESTING.md` |
| **Accessibility** | Skip link targets on core routes, map text-only facility list, Clinic `aria-live`, scenario feedback `role=status`, PwD native audio controls + transcript, labelled Chunav Saathi dialog/log, reduced-motion fallback, contrast-safe palette | `pnpm a11y` passed: 9/9 axe routes with color contrast enabled | `ACCESSIBILITY.md`, `TESTING.md` |
| **Testing** | Vitest unit + React Testing Library component tests + Supertest integration + Playwright E2E | `pnpm test` passed: 56/56 workspace tests; `pnpm e2e:ci` passed: 15/15 Chromium tests | `TESTING.md` |
| **User experience** | Ethnic-modern "Democracy ka Tyohar" design, Framer Motion with reduced-motion guardrails, tricolor hero, rangoli motifs, mobile-visible navigation | Playwright browser journeys for onboarding, Clinic, Map, Easy Mode, Play, Yatra, and chat | `README.md` |
| **Impact for Bharat** | Migrant Corner, PwD flow, 4+ languages, voice-first, non-partisan ECI sources | — | `README.md` |
| **Reliability** | `/api/health` dep-check, deterministic demo-mode for chat/forward/youtube/maps, Calendar ICS fallback, structured logs | `apps/functions/src/server.test.ts` | `ARCHITECTURE.md` |
| **Documentation** | This file + README + Architecture + Security + A11y + Testing + Prompts + Changelog + granular `tasks.md` | — | 9 markdown docs |
