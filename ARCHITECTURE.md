# Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                           Browser (PWA)                            │
│  Next.js 14 · Tailwind · Framer Motion · Service Worker · a11y     │
└───────────────────────┬────────────────────────────────────────────┘
                        │ HTTPS (rewrites /api/* → backend)
┌───────────────────────▼────────────────────────────────────────────┐
│                    apps/functions (Cloud Run)                      │
│  Express · helmet · rate-limit · SSE · Zod validation · logger     │
│    Routes: /api/health · /api/chat · /api/forward · /api/map/*     │
│            /api/quiz/* · /api/calendar/* · /api/tts · /api/stt     │
└───┬───────────┬──────────┬───────────┬─────────┬─────────┬─────────┘
    │           │          │           │         │         │
    ▼           ▼          ▼           ▼         ▼         ▼
 Gemini    Maps /       Calendar     YouTube   TTS       Firestore
 (stream)  Places /     OAuth                  STT       (Admin)
           Directions                          Translate
```

## Layers

1. **Presentation** (`apps/web`) — App Router pages, Tailwind design tokens, Framer Motion, PWA, i18n.
2. **API** (`apps/functions`) — Express routes with Zod input validation, SSE streaming, middleware for auth/reCAPTCHA/rate-limit/logging.
3. **Domain & Google adapters** (`packages/core`) — pure TS types, Zod schemas, `Result<T,E>`, `AppError` taxonomy, Google client wrappers. Zero framework deps → easy to unit-test and reuse in Cloud Functions/Workers.

## Data flow: Saathi chat

1. Browser opens SSE POST to `/api/chat` with `{locale, literacyComfort, persona?, stepSlug?, message}`.
2. Express validates with `ChatRequestSchema`. On config miss, streams `DEMO_REPLY`.
3. Otherwise `buildChunavSaathiPrompt(ctx)` → `GoogleGeminiClient.streamGenerate()` → SSE frames to client.
4. Client appends `delta` tokens to active `ChatBubble` with reduced-motion fade-in.

## Data flow: Forward Clinic

1. User pastes WhatsApp forward in `/clinic`.
2. Frontend runs reCAPTCHA Enterprise, sends token + text.
3. Backend validates via `ForwardAnalysisRequestSchema`, runs reCAPTCHA assessment, calls Gemini with classifier system prompt returning `ForwardAnalysisSchema`-shaped JSON.
4. Response stored in Firestore (per-user, TTL 90 days) + returned to UI as card with verdict, risk 1-5, category, reasoning, ECI citations.

## Extensibility seams

- **Vertex swap**: replace `GoogleGeminiClient` with `VertexGeminiClient` — same `GeminiClient` interface.
- **Mocking**: every Google wrapper accepts an injected HTTP fetcher → test fakes without mocking the network.
- **New API route**: add route file + Zod schema → registered in `apps/functions/src/server.ts`.

## Observability

- Structured JSON logs → Cloud Logging sink
- OpenTelemetry traces (console in dev, Cloud Trace in prod)
- `GET /api/metrics` — Prometheus counters for chat tokens, forward verdicts, quiz submits
