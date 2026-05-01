# Election Yatra — Task Tracker

> Phase-by-phase granular roadmap. Tick off items as you implement.
> Items marked ✅ are complete; items marked ⏳ are planned for the next
> working session.

**Status legend**: ✅ done · 🚧 in progress · ⏳ planned · 🧪 scaffold only

---

## Phase 0 — Repo scaffolding & infra *(Day 1)*

- [x] ✅ pnpm workspace (`apps/*`, `packages/*`)
- [x] ✅ Root `tsconfig.base.json`, Prettier, `.gitignore`, `.env.example`
- [x] ✅ `.antigravity/project.json` marker
- [x] ✅ `apps/web` Next.js 14 + TS + Tailwind
- [x] ✅ `apps/functions` Express + TS with `tsx` dev server
- [x] ✅ `packages/core` shared types/schemas/google
- [ ] ⏳ ESLint flat config with import-order + a11y plugins
- [ ] ⏳ GitHub Actions: lint + type-check + test + build
- [x] ✅ Dockerfile for Cloud Run (api + web)

## Phase 1 — Design system & landing *(Day 1–2)*

- [x] ✅ Tailwind tokens (saffron/leaf/indigo-chakra/khadi/marigold/henna)
- [x] ✅ Font pipeline (Playfair, Plus Jakarta, Noto Serif Devanagari)
- [x] ✅ Motifs: `AshokaChakra`, `RangoliPattern`
- [x] ✅ Core UI: Button, Card, Stepper
- [x] ✅ NavBar + Footer with tricolor divider
- [x] ✅ Landing page with 4 sections
- [ ] ⏳ Motif library: PaisleyBorder, LotusDivider, DiyaIcon, MarigoldParticles, InkedFinger
- [ ] ⏳ ChatBubble, QuizCard, MapPin, Badge, LanguageSwitcher, ReadAloudButton
- [ ] ⏳ Framer Motion scroll transitions + marigold particle system on hero
- [ ] ⏳ Inline SVG illustrations: tribal voter, migrant worker, farmer, PwD, urban youth, elderly woman (6 scenes)
- [ ] ⏳ Dark mode palette (khadi-night / henna accents)
- [ ] ⏳ PWA manifest + splash screens

## Phase 2 — Domain model *(Day 2)*

- [x] ✅ Types: VoterPersona, ElectionStep, ForwardAnalysis, QuizQuestion, BadgeDefinition, UserProgress, LeaderboardEntry, PollingFacility, ChatRequest
- [x] ✅ Zod schemas mirror for every type
- [x] ✅ `Result<T,E>` + `AppError` taxonomy
- [ ] ⏳ Unit tests on every schema (`packages/core/__tests__/schemas.test.ts`) — happy + invalid fixtures

## Phase 3 — Google client wrappers *(Day 2–3)*

- [x] ✅ `geminiClient.ts` (streaming + non-stream) + `buildChunavSaathiPrompt`
- [x] ✅ `mapsClient.ts` (geocode, reverse-geocode, distanceMatrix)
- [x] ✅ `firebaseAdmin.ts` (lazy init handle)
- [ ] ⏳ `geolocationClient.ts` (IP-fallback + `navigator.geolocation` wrapper)
- [x] ✅ `calendarClient.ts` — Google Calendar template links + ICS fallback
- [x] ✅ `youtubeClient.ts` — curated SVEEP playlist
- [x] ✅ `translationClient.ts` — Cloud Translation v2/v3
- [x] ✅ `ttsClient.ts` — Cloud Text-to-Speech (Neural2/Chirp)
- [x] ✅ `sttClient.ts` — Cloud Speech-to-Text (streaming)
- [x] ✅ `recaptchaClient.ts` — Enterprise assessment wrapper + demo bypass route path
- [ ] ⏳ `secretManager.ts` — lazy fetch with env fallback
- [ ] ⏳ `analyticsClient.ts` — GA4 Measurement Protocol
- [ ] ⏳ `PlacesClient` — Text Search, Nearby Search, Place Details (Google Maps API integration)
- [ ] ⏳ `DirectionsClient` — driving/walking/transit routes (Google Maps API integration)
- [ ] ⏳ Streaming adapter using `@google-cloud/vertexai` SDK (production swap)
- [ ] ⏳ Mock implementations for each client (tests)

## Phase 4 — Backend APIs *(Day 3–5)*

### Implemented
- [x] ✅ `GET /api/health` — status, version, uptime, dep readiness
- [x] ✅ `POST /api/chat` — SSE streaming + demo-mode fallback

### Planned
- [x] ✅ `POST /api/forward/analysis` — misinformation classifier, Zod input/output validation, reCAPTCHA-ready demo/prod mode
- [ ] ⏳ `POST /api/quiz/submit` — atomic XP/badge grant in Firestore
- [ ] ⏳ `GET /api/quiz/next` — unseen question for persona
- [x] ✅ `POST /api/calendar/add` — Google Calendar template links + OAuth-ready contract
- [x] ✅ `GET /api/calendar/ics` — `.ics` fallback (no OAuth)
- [x] ✅ `GET /api/config/public` — Maps key/id, reCAPTCHA site key, supported locales, feature flags
- [x] ✅ `GET /api/map/nearest-facilities` — user lat/lng → demo nearest booth+ERO or Distance Matrix
- [ ] ⏳ `GET /api/map/directions` — route + polyline
- [ ] ⏳ `POST /api/tts` — text → audio (cached by sha-256)
- [ ] ⏳ `POST /api/stt` — audio chunk → transcript
- [ ] ⏳ `POST /api/leaderboard/me` — privacy-preserving upsert
- [ ] ⏳ `GET /api/leaderboard/:city` — weekly top 20
- [ ] ⏳ `POST /api/translate` — UI-string fallback translator
- [x] ✅ `GET /api/youtube/sveep` — curated playlist route + explicit demo fallback
- [ ] ⏳ `POST /api/feedback` — hCaptcha-gated free-text feedback
- [ ] ⏳ `GET /api/metrics` — Prometheus-style basic metrics
- [ ] ⏳ Auth middleware (Firebase ID-token verification)
- [x] ✅ reCAPTCHA Enterprise verification on Forward Clinic (production) with explicit local demo bypass
- [ ] ⏳ Structured logger → Cloud Logging sink
- [ ] ⏳ OpenTelemetry traces (console exporter for dev)
- [ ] ⏳ Supertest coverage for every route (happy + 2 error paths)

## Phase 5 — Frontend flows *(Day 5–8)*

- [x] ✅ `/onboarding` — 4-step wizard (age / first-time / language / location) with progress bar
- [x] ✅ `/yatra` — 6-station stepper page with drawer-based Saathi chat
- [ ] ⏳ `/yatra/[slug]` — per-station deep dive with ECI citations
- [x] ✅ `/clinic` — Forward Clinic input + result card + verification steps
- [ ] ⏳ `/clinic/history` — personal scan history (Firestore)
- [x] ✅ `/sanrakshan` — Vote Sanrakshan anti-vote-buying and coercion guidance
- [x] ✅ `/easy-mode` — low-literacy/audio-first action hub with read-aloud support
- [x] ✅ `/map` — Maps JS API + nearest facility pins + route preview
- [ ] ⏳ `/map/booth` — Street View preview of user's booth
- [x] ✅ Ensure Maps API Keys (Maps JavaScript API, Places API, Geocoding API, Distance Matrix API) are configured in `.env` and loaded securely in Next.js/Express.
- [ ] ⏳ Interactive Map Enhancements: Add animations, dynamic route drawing, and custom Indian-themed map pins.
- [x] ✅ `/play` — quiz engine shell
- [x] ✅ `/play/scenario/[id]` — scenario mini-game routes
- [ ] ⏳ `/leaderboard` — privacy-preserving city leaderboard
- [x] ✅ `/migrant-corner` — address update, postal ballot explainer, travel plan
- [x] ✅ `/pwd` — accessibility-first guidance (braille EPIC, AMF)
- [ ] ⏳ `/about` — team, mission, neutrality statement
- [ ] ⏳ Global chat dock with streaming SSE consumer
- [ ] ⏳ Persona context provider (React Context + localStorage + Firestore sync)
- [ ] ⏳ Skeleton screens for every async surface
- [ ] ⏳ 404 + 500 + offline pages with yatra-styled illustrations

## Phase 6 — Gamification *(Day 7–9)*

- [x] ✅ XP ledger: localStorage-backed scenario XP with duplicate-claim prevention
- [ ] ⏳ Badges (12+): first 4 implemented locally; full badge catalog still planned
- [ ] ⏳ Streak system with "festival freeze" logic
- [x] ✅ Scenario game #1 — "Chai tapri dilemma" (choose-your-own-adventure, dialogue tree)
- [x] ✅ Scenario game #2 — "WhatsApp forward rush" (60-sec classify 10 forwards, Canvas timer)
- [x] ✅ Scenario game #3 — "Booth ka raasta" (migrant maze, arrow-key navigation, tile grid)
- [ ] ⏳ Share card generator (SVG → PNG) + WhatsApp deep link
- [ ] ⏳ Weekly leaderboard reset (Cloud Scheduler cron)
- [ ] ⏳ Celebration animations (confetti + muted diya glow, respects prefers-reduced-motion)

## Phase 7 — i18n & accessibility *(Day 9–10)*

- [ ] ⏳ `next-intl` setup, locales: en, hi, bn, ta
- [ ] ⏳ Translation JSON for every component (extract strings)
- [ ] ⏳ Server-side fallback via Cloud Translation for bn/ta stubs
- [x] ✅ Read-Aloud button with TTS + transcript on PwD page; reusable component still planned
- [ ] ⏳ Mic input in chat + clinic using STT
- [ ] ⏳ Keyboard-navigable stepper (arrow keys, `role="tablist"`)
- [x] ✅ ARIA live/result regions for Clinic and scenario feedback; streaming chat region still planned
- [x] ✅ Easy Mode route (big icons, audio-first, minimal prose); per-page simplified views still planned
- [ ] ⏳ `prefers-reduced-motion` fallbacks everywhere
- [ ] ⏳ axe-core + lighthouse a11y ≥ 100
- [ ] ⏳ VoiceOver/TalkBack manual smoke

## Phase 8 — Testing *(Day 10–11)*

- [x] ✅ Unit: result helpers, schemas, Maps wrapper
- [x] ✅ Unit: Chunav Saathi prompt guardrails
- [x] ✅ Integration: Supertest for health, Forward Clinic, Calendar ICS, YouTube demo route
- [ ] ⏳ Component: RTL for QuizCard, ChatBubble, Stepper, ReadAloudButton
- [ ] ⏳ E2E: Playwright — onboarding, yatra, clinic, quiz, calendar OAuth mock
- [ ] ⏳ Coverage ≥ 75% lines / 80% core
- [ ] ⏳ `pnpm e2e:ci` — headless Chromium on CI
- [ ] ⏳ Lighthouse CI budgets for every route

## Phase 9 — Security hardening *(Day 11–12)*

- [ ] ⏳ All secrets via Secret Manager; env fallback dev-only
- [ ] ⏳ reCAPTCHA Enterprise on `/chat`, `/leaderboard/me`, `/feedback`; `/forward/analysis` implemented
- [ ] ⏳ Firebase Security Rules (per-user progress, read-only quizzes, server-only leaderboard writes)
- [ ] ⏳ CSP + HSTS + Referrer-Policy + X-Content-Type-Options via Next.js `headers()`
- [ ] ⏳ DOMPurify on any HTML-rendered content
- [ ] ⏳ Prompt-injection defense (role isolation, tool-sandbox, input length caps)
- [ ] ⏳ STRIDE-lite threat model written in `SECURITY.md`
- [ ] ⏳ OWASP ZAP baseline scan pass
- [ ] ⏳ `npm audit` / Dependabot clean
- [x] ✅ PII minimization: Forward Clinic no raw model output logging; chat redaction helper still planned

## Phase 10 — Performance & PWA *(Day 12–13)*

- [ ] ⏳ Next.js Image + AVIF/WebP for all raster assets
- [ ] ⏳ Dynamic imports for Map page + Quiz engine + Scenario canvas
- [ ] ⏳ Route-segment caching + streaming
- [ ] ⏳ `manifest.webmanifest` + icons (192/512/maskable)
- [ ] ⏳ Service worker (Serwist) with offline fallback for FAQs/yatra static content
- [ ] ⏳ Lighthouse Performance + PWA ≥ 90

## Phase 11 — Docs, deploy, polish *(Day 13–14)*

- [ ] ⏳ Root docs: `README.md`, `ARCHITECTURE.md`, `GOOGLE_SERVICES.md`, `EVALUATION_MAPPING.md`, `SECURITY.md`, `ACCESSIBILITY.md`, `TESTING.md`, `PROMPTS.md`, `CHANGELOG.md`
- [ ] ⏳ `EVALUATION_MAPPING.md` table: Rubric Axis → code paths + tests + docs (target: 100% rubric coverage)
- [ ] ⏳ Architecture diagram (Mermaid)
- [ ] ⏳ README screenshots + 60-sec demo video script
- [ ] ⏳ Firebase Hosting + Cloud Run deploy via GitHub Actions
- [ ] ⏳ Wildcard domain + SSL
- [ ] ⏳ Attribution sweep: verify no third-party AI tool names leak into the repo
- [ ] ⏳ Final accessibility audit
- [ ] ⏳ Soft-launch + collect tester feedback

---

## Research Gap Audit — Highest-Impact Additions *(2026-05-01)*

These items come directly from `docs/research.md` and are the strongest remaining
ways to make the product feel deeper than a generic civic chatbot.

### Priority A — Add before demo submission

- [x] ✅ **Vote Sanrakshan module** — anti-vote-buying/coercion page plus a new Play scenario and badge.
- [ ] ⏳ **Easy Mode** — initial route implemented; still extend one-tap listen controls into Yatra, Clinic, Map, Migrant Corner, and PwD page cards.
- [ ] ⏳ **Migrant Yatra Planner** — turn `/migrant-corner` into an action planner: current city, home constituency, registration/address-update choice, travel reminder, and official source checklist.
- [ ] ⏳ **Google Maps depth pack** — add Places search for ERO/voter centers, Directions route preview/polyline, and Street View Static preview for the booth card.
- [x] ✅ **Prompt craftsmanship tests** — unit-test `buildChunavSaathiPrompt` for neutrality, official-source guidance, Hindi/easy-language adaptation, and audio-first behavior.

### Priority B — Strong judge polish

- [ ] ⏳ **SVEEP learning hub** — frontend page/section that calls `/api/youtube/sveep`, embeds curated videos, and links them to Yatra steps.
- [ ] ⏳ **Voice question input** — mic button for Chat and Clinic using Cloud Speech-to-Text with text fallback.
- [ ] ⏳ **Privacy-preserving leaderboard** — nickname + city only, no real name/EPIC/Aadhaar; weekly reset evidence via Cloud Scheduler plan.
- [ ] ⏳ **Offline civic kit** — PWA cache for core FAQs, Yatra steps, quiz scenarios, and emergency official links for low-network voters.
- [ ] ⏳ **Analytics funnel proof** — GA4/Firebase Analytics events for onboarding completion, clinic scans, calendar adds, map directions, and scenario completion.

### Priority C — Stretch differentiators

- [ ] ⏳ **Community-class mode** — projector-friendly flow for teachers/volunteers at panchayat halls or Anganwadi sessions.
- [ ] ⏳ **Shareable badge cards** — generate image cards for completed scenarios with official-source reminder text and no party/candidate references.
- [ ] ⏳ **Candidate-information guardrail** — neutral explanation of how to inspect affidavits and official candidate info without ranking or recommending candidates.

---

## Stretch goals (after base ≥ 9/10 score)

- [ ] Voice-clone Saathi using Chirp 3 HD voices
- [ ] WhatsApp Business integration — Saathi replies inside WhatsApp
- [ ] AR polling-booth preview via `<model-viewer>`
- [ ] Multi-agent Chunav Saathi (researcher + validator + presenter) via ADK
- [ ] Candidate-comparison tool (neutral: ADR affidavit + ECI data, no opinion)
- [ ] Braille PDF voter guide via Cloud Print
- [ ] Offline-first PWA that caches FAQs on first visit for 2G networks
- [ ] SMS-based Saathi for feature phones (Twilio + Vonage)
