# Staging Status

Updated: 2026-06-14

## Deployed Location

- Server source: `/opt/eco-factory-owned`
- Staging frontend: `http://157.85.108.152:18080`
- Local server check: `http://127.0.0.1:18080`

## Current Result

- Docker images build successfully on the server.
- Staging containers are running:
  - `eco-factory-owned-db-1`
  - `eco-factory-owned-backend-1`
  - `eco-factory-owned-frontend-1`
- Database was restored from:
  `/root/eco-factory-migration-backups/20260614-084549/eco_factory.dump`
- Smoke checks passed:
  - `GET /healthz`
  - `GET /api/v1/config`
  - `GET /`
- `npm audit --omit=dev` inside the backend image reports zero vulnerabilities.

## Notes

- Production at `app.verdixgreen.com` has not been cut over.
- The new backend uses the existing PostgreSQL schema.
- Waste Award export now returns CSV from the existing `/api/v1/waste-award/:id/excel` endpoint to avoid the vulnerable `xlsx` package.
- `khomsans@gmail.com` exists in the restored staging database, but the password previously provided did not match the restored hash.
