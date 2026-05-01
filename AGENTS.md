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

## Gotchas

- `docs/` is intentionally gitignored for research and session logs.
- Do not commit real `.env` secrets.
- The web Dockerfile must set `NEXT_STANDALONE=true`; local Windows builds should not require standalone output.
- Avoid old pnpm filters like `web` or `functions`; use `@yatra/web` and `@yatra/functions`.
