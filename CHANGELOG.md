# Changelog

All notable changes to Election Yatra.

## [0.4.0] - 2026-05-02

### Added
- Backend-only `llm-service` client for Antigravity `gemini-3-flash` with SMK and opt-in BYOK/secret support.
- Unit tests proving the wrapper sends model overrides, auth headers, and falls back from BYOK to SMK.
- Stable Cloud Run URL, slow deployment, and backend AI secret guidance in `AGENTS.md`.
- `SUGGESTIONS.md` with win-focused product, gamification, Google Maps, UI, and testing ideas.

### Changed
- `/api/chat` now calls `llm-service` instead of direct Gemini route code when `DEMO_MODE=false`.
- `/api/forward/analysis` now uses `llm-service` for Forward Clinic classification with deterministic local fallback.
- Health checks now report `llmService` readiness instead of direct `gemini` key readiness.
- README, architecture, and Google Services docs now describe the backend-only AI wrapper.

### Fixed
- AI and `/clinic` no longer depend on a direct `GEMINI_API_KEY` being present in Cloud Run.

### Security
- Added explicit documentation that `LLM_SERVICE_API_KEY` and `LLM_SERVICE_INTERNAL_KEY` must stay in Cloud Run env/Secret Manager or ignored `.env.local` only.

### Verified
- Pending final local and live deployment validation for this change.

## [0.3.0] — 2026-05-02

### Added
- Vote Sanrakshan page for safe anti-vote-buying and coercion guidance.
- Easy Mode page with large action tiles, transcript-first guidance, and browser read-aloud support.
- Vote Sanrakshan Play scenario with XP and a new `Vote Sanrakshak` badge.
- Prompt-craftsmanship tests for Chunav Saathi neutrality, official-source guidance, Hindi/easy-language adaptation, and audio-first behavior.
- `AGENTS.md` with local validation, dev-server, and Google Cloud deployment notes.
- `.gcloudignore` to keep local secrets, dependencies, build output, and ignored research docs out of Cloud Build uploads.

### Changed
- Primary navigation now exposes Vote Sanrakshan and Easy Mode as first-class flows.
- Home page highlights Vote Sanrakshan and Easy Mode alongside Clinic, Map, and Play.
- Cloud Run Dockerfiles now use the correct `@yatra/*` pnpm filters, build shared core first, and enable Next standalone output for the web image without assuming an `apps/web/public` directory.

### Verified
- `pnpm type-check` passed.
- `pnpm test` passed (24 tests).
- `pnpm build` passed.
- Browser smoke passed for `/easy-mode`, `/sanrakshan`, and `/play/scenario/vote-sanrakshan` XP/badge flow.

## [0.2.0] — 2026-05-01

### Added
- reCAPTCHA Enterprise client wrapper with local demo bypass and production verification path.
- Calendar reminder support through Google Calendar template links and ICS fallback.
- YouTube SVEEP API route with explicit demo fallback.
- Schema, Maps wrapper, and API integration tests (21 tests total across core/functions).
- Persistent local XP, completed scenario state, and badge unlocks for Play scenarios.
- Accessible Forward Clinic result region, source links, and demo/security mode chips.
- Text-only map facility list and retryable public config loading.
- Native audio controls and transcript on the PwD accessibility page.

### Changed
- Forward Clinic API now validates request and AI-shaped output with Zod schemas.
- Public config exposes Google-feature flags, map ID, reCAPTCHA site key, and demo mode.
- Next standalone output is opt-in via `NEXT_STANDALONE=true` to avoid Windows symlink build failures.

### Fixed
- Removed raw Gemini payload logging from the shared Gemini client.
- Centralized map route config instead of reading environment variables in the route.

### Verified
- `pnpm type-check` passed.
- `pnpm test` passed (21 tests).
- `pnpm build` passed.

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
