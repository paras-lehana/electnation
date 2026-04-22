# Changelog

All notable changes to Election Yatra.

## [0.1.0] — 2026-04-21

### Added
- Monorepo scaffold: pnpm workspaces, `apps/web`, `apps/functions`, `packages/core`
- Design system: tricolor palette, Ashoka Chakra + rangoli motifs, Playfair × Noto Serif Devanagari fonts, Framer Motion-ready Tailwind tokens
- Landing page with hero, Saathi chat preview, 6-station stepper, pillars, accessibility banner
- Shared domain model: `Result<T,E>`, `AppError` taxonomy, 11 error codes, all types + Zod schemas
- Google client wrappers: Gemini (SSE streaming + `buildChunavSaathiPrompt`), Maps (geocode, reverse-geocode, distance matrix), Firebase Admin (skeleton)
- Backend: `GET /api/health` dependency-aware, `POST /api/chat` SSE with demo-mode fallback, structured JSON logger, in-memory rate limiter
- Anti-attribution: `.antigravity/project.json` marker, `.gitignore` scrub for builder metadata
- Docs: `README.md`, `ARCHITECTURE.md`, `GOOGLE_SERVICES.md`, `EVALUATION_MAPPING.md`, `SECURITY.md`, `ACCESSIBILITY.md`, `TESTING.md`, `PROMPTS.md`, `tasks.md`

### Next
- See `tasks.md` Phases 5–11 for full feature completion roadmap.
