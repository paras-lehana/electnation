# Election Yatra — Janta ka Election Saathi

> **Version 0.4.0** — backend-only llm-service AI, stable Cloud Run deployment notes, and win-focused roadmap.

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

## Monorepo layout

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

## Local setup

Prerequisites: **Node ≥ 20**, **pnpm ≥ 9**.

```bash
cp .env.example .env.local        # fill what you need (runs demo-mode without keys)
pnpm install
pnpm dev                           # runs web (:3000) + functions (:8080) in parallel
```

### Demo mode

If `DEMO_MODE=true`, `/api/chat` streams a scripted Hinglish demo reply and
`/api/forward/analysis` uses deterministic local analysis so the UI and tests can
run without credentials. Production uses backend-only `llm-service` with
Antigravity `gemini-3-flash`; secrets stay in Cloud Run env/Secret Manager and
are never exposed through frontend config.

### Smoke tests

```bash
curl http://localhost:8080/api/health
# → 200 {"status":"degraded","version":"0.4.0",...}

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
- **Testing**: Vitest · Supertest · React Testing Library · Playwright · axe-core · Lighthouse CI
- **DX**: ESLint flat · Prettier · Husky · GitHub Actions · Antigravity workspace

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
