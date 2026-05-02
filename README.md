# Election Yatra — Janta ka Election Saathi

> **Version 0.4.2** — Production hardening for clinic and map flows with demo mode made opt-in and final-release fallback copy cleaned up.

> **An AI companion for Indian voters.** Walk the 6-station yatra from
> registration to polling booth, spot WhatsApp misinformation, find your
> booth on the map, and learn through scenario-based play — all in your
> language.

Built with the **Google Antigravity** stack for the Hack2skill
_Google Prompt Wars_ hackathon (April 2026).

![Tricolor hero](./public/screenshots/hero.png)

---

## Highlights

| Axis | How Election Yatra delivers |
| --- | --- |
| **Novelty** | First civic companion that blends Chunav Saathi (conversational AI) + Misinformation Clinic + gamified yatra + voice-first Easy Mode |
| **Google services used** | llm-service with Antigravity Gemini (`gemini-3-flash`) · Maps/Places/Directions/Distance Matrix/Street View · Calendar OAuth · YouTube Data v3 · Cloud Text-to-Speech + Speech-to-Text · Cloud Translation · Firebase Auth + Firestore · reCAPTCHA Enterprise · Secret Manager · Cloud Logging · Cloud Run |
| **Accessibility** | WCAG-AA target · Easy Mode (audio-first) · 4+ languages · Read-aloud on every card |
| **Security** | Secret Manager · reCAPTCHA Enterprise · Firebase Security Rules · STRIDE-lite threat model · PII minimization |
| **Made in Bharat** | Ethnic-modern "Democracy ka Tyohar" aesthetic — Ashoka Chakra, rangoli patterns, khadi palette, Playfair × Noto Serif Devanagari |

---

## File Index / Monorepo Layout

```
election-yatra/
├── apps/
│   ├── web/           # Next.js 14 App Router + Tailwind + Framer Motion
│   └── functions/     # Express on Cloud Run — SSE streaming + APIs
├── packages/
│   └── core/          # Shared types, Zod schemas, Result, AppError, Google clients
├── .gcloudignore      # Cloud Build upload exclusions for secrets/artifacts
├── tasks.md           # Granular task tracker (phase-by-phase)
├── AGENTS.md          # Agent commands, validation, and GCloud deploy notes
├── ARCHITECTURE.md    # Data flow + layering
├── GOOGLE_SERVICES.md # Service → file mapping
├── EVALUATION_MAPPING.md  # Rubric ↔ code mapping
├── SECURITY.md
├── ACCESSIBILITY.md
├── TESTING.md
├── PROMPTS.md         # Chunav Saathi prompt engineering
├── SUGGESTIONS.md     # Win-focused roadmap for maps, gamification, UI, tests
└── CHANGELOG.md
```

| Path | Purpose | When to read |
| --- | --- | --- |
| `apps/web/` | Next.js voter-facing experience: Yatra, Clinic, Map, Play, Easy Mode | UI flow changes and browser testing |
| `apps/web/lib/apiClient.ts` | Shared browser API URL, JSON request, Forward Clinic fallback, and chat SSE helpers | Any frontend API or streaming change |
| `apps/functions/` | Express API for Cloud Run: health, chat, clinic, maps, calendar, YouTube | Backend route and deployment changes |
| `apps/functions/src/services/forwardAnalysisService.ts` | Forward Clinic domain logic: llm-service prompt, normalization, local fallback, recommended action | Misinformation analysis behavior changes |
| `packages/core/` | Shared schemas, types, Result/AppError helpers, Google wrappers, version constant | Cross-app contracts and validation |
| `tasks.md` | Granular roadmap and code-quality hardening tracker | Session planning and rubric progress |
| `AGENTS.md` | Local commands, Cloud Run deploy commands, stable URLs, env/secret gotchas | Before testing or deploying |
| `EVALUATION_MAPPING.md` | Rubric axis to proof mapping | Before submission review |

## Local setup

Prerequisites: **Node ≥ 20**, **pnpm ≥ 9**.

```bash
cp .env.example .env.local        # fill what you need; set DEMO_MODE=true only for scripted local demo flows
pnpm install
pnpm dev                           # runs web (:3000) + functions (:8080) in parallel
```

### Demo mode

If `DEMO_MODE=true`, `/api/chat` streams a scripted Hinglish demo reply and
`/api/forward/analysis` uses deterministic local analysis so the UI and tests can
run without credentials. Production uses backend-only `llm-service` with
Antigravity `gemini-3-flash`; secrets stay in Cloud Run env/Secret Manager and
are never exposed through frontend config. `DEMO_MODE` now defaults to `false`
when unset, so production revisions do not silently fall back to demo behavior.

For the hackathon Cloud Run demo, `RECAPTCHA_BYPASS=true` is set on the API so
judges can exercise Forward Clinic without a site-key challenge. Turn that off
after wiring a production reCAPTCHA site key.

### Smoke tests

```bash
curl http://localhost:8080/api/health
# → 200 {"status":"degraded","version":"0.4.2",...}

curl -N -X POST http://localhost:8080/api/chat \
  -H "content-type: application/json" \
  -d '{"locale":"en","literacyComfort":"standard","message":"How do I register to vote?"}'
# → SSE stream of Chunav Saathi reply
```

## Design notes

Election Yatra intentionally avoids generic AI-assistant aesthetics. The
visual language — **tricolor gradients, rangoli mandalas, paisley
borders, diya glow, khadi textures** — roots the product in Indian
civic culture. The 6-station stepper (_Register → Verify → Candidates →
Spot Fake → Poll Day → Reflect_) reflects the pilgrimage metaphor
announced in the tagline: *"Chalo, apna Bharat samajhte hain — ek
yatra, ek vote."*

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript strict, Tailwind CSS, Framer Motion
- **Backend**: Express 4 on Cloud Run, TypeScript, Zod validation
- **Shared**: pnpm workspaces, `@yatra/core` package
- **Google**: llm-service with Antigravity Gemini · Maps · Calendar · YouTube · TTS · STT · Translation · Firebase · reCAPTCHA Enterprise · Secret Manager · Cloud Run · Cloud Logging
- **Testing**: Vitest · Supertest · direct TypeScript checks · planned Playwright/axe/Lighthouse CI
- **DX**: TypeScript strict · Prettier · Cloud Build docs · planned ESLint/GitHub Actions · Antigravity workspace

## Non-partisan pledge

Election Yatra does **not** endorse any political party or candidate.
All authoritative information links to the
[Election Commission of India](https://eci.gov.in) and the
[National Voters' Services Portal](https://voters.eci.gov.in). Chunav
Saathi's system prompt explicitly refuses partisan content and returns
verified sources instead.

## License

MIT — see `LICENSE`.

---

_Built with_ ❤ _using Google Antigravity._
