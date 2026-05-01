# Security

## Threat model (STRIDE-lite)

| Threat | Surface | Mitigation |
| --- | --- | --- |
| **S**poofing | `/api/leaderboard/me` | Firebase Auth ID-token verification; nickname regex allow-list |
| **T**ampering | `/api/forward/analysis` payload | Zod request schema + Zod output schema + 4 KB body cap + reCAPTCHA Enterprise wrapper |
| **R**epudiation | Calendar OAuth grants | Event IDs written to Firestore with user UID |
| **I**nformation disclosure | Chat transcripts | No PII stored; Aadhaar/EPIC redacted server-side; Firestore rules deny cross-user reads |
| **D**enial of service | Public SSE routes | In-memory token bucket + Cloud Armor rules (prod) |
| **E**levation | Firestore writes | Server-only admin SDK writes for leaderboard/quizzes; client-side read-only |

## Prompt injection defense

- System prompt isolated via role tagging; user messages never concatenated without the `### USER_INPUT` delimiter.
- Input length cap (2 KB) + unicode normalization.
- Gemini safety settings and route-level prompts prohibit partisan recommendations and voter suppression assistance.
- Output policy: refusal template for partisan / hate-speech / personal-data harvesting attempts.
- Tool-sandbox: Saathi cannot call tools that return attacker-controlled data (e.g., fetch arbitrary URLs).

## Secret management

All credentials live in Google Secret Manager; the app bootstraps via
workload identity on Cloud Run. Local dev uses `.env.local` (gitignored)
with `.env.example` as the schema-of-record.

Local demo runs with `RECAPTCHA_BYPASS=true`; production must set
`RECAPTCHA_BYPASS=false` and provide `RECAPTCHA_PROJECT_ID`,
`RECAPTCHA_SITE_KEY`, and `RECAPTCHA_API_KEY`.

## Implemented controls

- Public API rate limit via `apps/functions/src/middleware/rateLimit.ts`.
- Forward Clinic validates both inbound payload and outbound AI-shaped JSON.
- Forward Clinic logs only metadata: mode, category, risk, input length, latency, and bypass flag.
- reCAPTCHA Enterprise client wrapper is dependency-injected and testable.
- Calendar reminders have a no-OAuth ICS fallback for demo reliability.

## Transport

- HTTPS everywhere (Cloud Run TLS + Firebase Hosting)
- HSTS `max-age=31536000; includeSubDomains; preload`
- Strict CSP: `default-src 'self'; script-src 'self' 'strict-dynamic'; img-src 'self' data: https://maps.gstatic.com; connect-src 'self' https://generativelanguage.googleapis.com https://*.googleapis.com;`

## Data minimization

- No Aadhaar or EPIC numbers stored anywhere
- Chat messages kept in Firestore for 30 days then auto-deleted (TTL)
- Leaderboard stores nickname (not real name), city, XP — no IP, no device id
- Analytics events batched server-side; no third-party trackers in the browser
