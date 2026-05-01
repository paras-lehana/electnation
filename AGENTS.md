# Election Yatra Agent Notes

## Project Shape

- Monorepo root: `c:\Users\paras\code\hackathons\electnation`
- Workspaces: `apps/web`, `apps/functions`, `packages/core`
- Shared package must be built before dependent checks because `@yatra/core` exports from `dist`.

## Local Validation

Run from the repository root:

```powershell
pnpm type-check
pnpm test
pnpm build
```

Expected current baseline:

- `pnpm type-check` passes all workspaces.
- `pnpm test` passes core and functions tests.
- `pnpm build` builds core, functions, and Next.js web.

## Local Dev Servers

Use explicit package names or `pnpm -C` to avoid PowerShell running from the Windows user profile:

```powershell
pnpm -C c:\Users\paras\code\hackathons\electnation --filter @yatra/functions dev
pnpm -C c:\Users\paras\code\hackathons\electnation --filter @yatra/web dev
```

- API: `http://localhost:8080`
- Web: `http://localhost:3000`

## Google Cloud Deployment

Active GCloud project used for this repo: `event-manager-promptwars`.
Region: `us-central1`.
Cloud Run services:

- `electnation-api`
- `electnation-web`

Stable public URLs used for judging and smoke tests:

- Web: `https://electnation-web-767171449038.us-central1.run.app`
- API: `https://electnation-api-767171449038.us-central1.run.app`

Cloud Run may also show shorter `*.a.run.app` hostnames in `gcloud run services describe`,
but the URLs above stay stable as long as the same service names, project, and region are reused.
Always deploy to `electnation-api` and `electnation-web`; do not create new service names.

Deployment can take several minutes because Cloud Build uploads source, rebuilds the monorepo
Docker image, pushes it to Container Registry, creates a new Cloud Run revision, and shifts traffic.
Keep `.gcloudignore` small and correct so `node_modules`, `.next`, `dist`, ignored `docs/`, and
`.env*` files do not slow uploads or leak local material.

Build images with Cloud Build:

```powershell
gcloud builds submit c:\Users\paras\code\hackathons\electnation --config c:\Users\paras\code\hackathons\electnation\cloudbuild-api.yaml
gcloud builds submit c:\Users\paras\code\hackathons\electnation --config c:\Users\paras\code\hackathons\electnation\cloudbuild-web.yaml
```

Deploy images:

```powershell
gcloud run deploy electnation-api --image gcr.io/event-manager-promptwars/electnation-api --region us-central1 --platform managed --allow-unauthenticated
gcloud run deploy electnation-web --image gcr.io/event-manager-promptwars/electnation-web --region us-central1 --platform managed --allow-unauthenticated
```

Use explicit project flags when running from a fresh terminal:

```powershell
gcloud run deploy electnation-api --image gcr.io/event-manager-promptwars/electnation-api --region us-central1 --platform managed --allow-unauthenticated --project event-manager-promptwars
gcloud run deploy electnation-web --image gcr.io/event-manager-promptwars/electnation-web --region us-central1 --platform managed --allow-unauthenticated --project event-manager-promptwars
```

Post-deploy verification:

```powershell
Invoke-RestMethod https://electnation-api-767171449038.us-central1.run.app/api/health | ConvertTo-Json -Depth 4
@('/','/easy-mode','/sanrakshan','/clinic','/play/scenario/vote-sanrakshan') | ForEach-Object {
	$url = "https://electnation-web-767171449038.us-central1.run.app$_"
	$response = Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 30
	"$($_) $($response.StatusCode)"
}
```

## Backend AI Configuration

Election Yatra must call AI through backend-only `llm-service`, not from the browser
and not through direct provider SDK calls in route handlers.

Production settings:

- `LLM_SERVICE_URL=https://llm.lehana.in`
- `LLM_SERVICE_ENDPOINT=antigravity-manager`
- `LLM_SERVICE_MODEL=gemini-3-flash`
- `LLM_SERVICE_PROVIDER=custom`
- `LLM_SERVICE_PROVIDER_BASE_URL=https://antigravity.aidhunik.com/v1`
- `LLM_SERVICE_BYOK=false` for the working SMK path.
- `LLM_SERVICE_INTERNAL_KEY` must come from Cloud Run env/Secret Manager only.
- `LLM_SERVICE_API_KEY` is optional and should only be set when `/byok` auth is enabled.

Never expose `LLM_SERVICE_API_KEY` or `LLM_SERVICE_INTERNAL_KEY` through `NEXT_PUBLIC_*`,
`/api/config/public`, client components, screenshots, or committed docs. If local testing
needs real AI, put values in ignored `.env.local`.

Cloud Run secret wiring pattern:

```powershell
gcloud secrets create electnation-llm-service-key --replication-policy=automatic --project event-manager-promptwars
gcloud secrets versions add electnation-llm-service-key --data-file=- --project event-manager-promptwars
gcloud run services update electnation-api --region us-central1 --project event-manager-promptwars --set-env-vars DEMO_MODE=false,LLM_SERVICE_ENABLED=true,LLM_SERVICE_URL=https://llm.lehana.in,LLM_SERVICE_ENDPOINT=antigravity-manager,LLM_SERVICE_MODEL=gemini-3-flash,LLM_SERVICE_PROVIDER=custom,LLM_SERVICE_PROVIDER_BASE_URL=https://antigravity.aidhunik.com/v1,LLM_SERVICE_BYOK=false --set-secrets LLM_SERVICE_INTERNAL_KEY=electnation-llm-service-key:latest
```

## Gotchas

- `docs/` is intentionally gitignored for research and session logs.
- Do not commit real `.env` secrets.
- AI keys are backend-only. Use Cloud Secret Manager or ignored `.env.local`.
- The web Dockerfile must set `NEXT_STANDALONE=true`; local Windows builds should not require standalone output.
- Avoid old pnpm filters like `web` or `functions`; use `@yatra/web` and `@yatra/functions`.
- When PowerShell cwd drifts to `C:\Users\paras`, use `pnpm -C c:\Users\paras\code\hackathons\electnation ...` or absolute paths.
