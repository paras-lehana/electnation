# Google Services Used

| # | Google service | Purpose in Election Yatra | Code entry point |
| - | --- | --- | --- |
| 1 | **Gemini API / Vertex AI** | Chunav Saathi conversational chat, Forward Clinic classification, quiz generation | `packages/core/src/google/geminiClient.ts` |
| 2 | **Google Maps JavaScript API** | Booth/ERO map, Street View preview of polling booths | `apps/web/app/map/*` |
| 3 | **Geocoding API** | Address → lat/lng for onboarding & booth lookup | `packages/core/src/google/mapsClient.ts` |
| 4 | **Places API (New)** | Nearest polling station / ERO office search | `packages/core/src/google/mapsClient.ts` → planned `PlacesClient` |
| 5 | **Distance Matrix API** | Travel time estimate to booth | `packages/core/src/google/mapsClient.ts#distanceMatrix` |
| 6 | **Directions API** | Route polyline (walking / transit / driving) | planned `DirectionsClient` |
| 7 | **Street View Static API** | Preview image of user's polling booth | planned |
| 8 | **Google Calendar API** | Add registration-deadline / poll-day reminders via OAuth 2.0 | planned `CalendarClient` + `/api/calendar/*` |
| 9 | **YouTube Data API v3** | Curated SVEEP educational playlist (non-partisan) | planned `YouTubeClient` + `/api/youtube/sveep` |
| 10 | **Cloud Text-to-Speech** | ✅ Read-aloud on content cards (Neural2 / Chirp) | `apps/functions/src/routes/tts.ts` + `/api/tts` |
| 11 | **Cloud Speech-to-Text** | 🧱 Mic input interface (stubs) | planned `STTClient` |
| 12 | **Cloud Translation API v3** | ✅ UI fallback + Chunav Saathi reply localization | `apps/functions/src/routes/translate.ts` + `/api/translate` |
| 13 | **Firebase Authentication** | Optional login for progress sync + calendar consent | planned |
| 14 | **Firestore** | User progress, quiz answers, forward-clinic history, leaderboard | `packages/core/src/google/firebaseAdmin.ts` |
| 15 | **Firebase Hosting** | Static Next.js deploy alongside Cloud Run backend | planned (CI) |
| 16 | **reCAPTCHA Enterprise** | Abuse protection on chat, forward analysis, feedback, leaderboard upsert | planned middleware |
| 17 | **Secret Manager** | ✅ Secure API key storage (Gemini/Maps/Calendar) | Cloud Run Config → `process.env` |
| 18 | **Cloud Logging** | ✅ Structured JSON logs sink | `apps/functions/src/middleware/logger.ts` |
| 19 | **Cloud Run** | ✅ Backend container runtime | `cloudbuild-api.yaml` + `cloudbuild-web.yaml` |
| 20 | **Google Cloud Scheduler** | Weekly leaderboard rollover job | planned |
| 21 | **Google Analytics 4** | Anonymous usage analytics | planned `analyticsClient` |

> **Legend**: ✅ already wired in this commit · 🧱 interface + stub only ·
> 🗓️ planned for the next working session (see `tasks.md`)
