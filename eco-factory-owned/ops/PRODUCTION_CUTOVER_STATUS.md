# Production Cutover Status

Updated: 2026-06-14

## Result

Production has been cut over from the old third-party GitLab images to the
Verdixgreen-owned stack.

## Running Stack

- Source: `/opt/eco-factory-owned`
- Compose file: `/opt/eco-factory-owned/ops/docker-compose.production-owned.yml`
- Containers:
  - `eco-factory-owned-prod-db-1`
  - `eco-factory-owned-prod-backend-1`
  - `eco-factory-owned-prod-frontend-1`
- Public URL: `https://app.verdixgreen.com`

## Backup Used

Fresh pre-cutover backup:

`/root/eco-factory-migration-backups/pre-cutover-20260614-144300`

Contents include:

- `eco_factory.dump`
- `schema.sql`
- `uploads.tar.gz`
- `docker-compose.prod.yml`
- `SHA256SUMS`

## Smoke Tests Passed

- `https://app.verdixgreen.com/healthz`
- `https://app.verdixgreen.com/api/v1/config`
- Frontend bundle loads from the owned image.
- `khomsans@gmail.com` login was verified after resetting the password hash to the provided password.

## Old Stack

The old `/opt/eco-factory/docker-compose.prod.yml` stack is stopped. Its Docker
volumes remain on the server for rollback:

- `eco-factory_pgdata`
- `eco-factory_uploads`

## Rollback

If rollback is needed:

```bash
cd /opt/eco-factory-owned/ops
docker compose --env-file .env -f docker-compose.production-owned.yml down

cd /opt/eco-factory
docker compose -f docker-compose.prod.yml up -d
```
