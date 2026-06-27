# Eco Factory Owned Rebuild

This directory is the owned replacement path for the current Eco Factory runtime.

It is designed to remove the production dependency on the old third-party GitLab
images while keeping the existing PostgreSQL schema and frontend API contract.

## Structure

```text
backend/       New API source
frontend/      Static frontend image source
ops/           Compose and deployment templates
```

## Current Status

- Backend source targets the existing `eco_factory` schema.
- Frontend image source is populated from the current verified deployed
  frontend, including the menu hotfixes requested on 2026-06-14.
- Production is deployed on the server through the owned stack.
- See `ops/PRODUCTION_CUTOVER_STATUS.md` for the current production state.

## Local Backend

```bash
cd backend
npm install
npm run dev
```

Required environment variables are documented in `ops/env.example`.
