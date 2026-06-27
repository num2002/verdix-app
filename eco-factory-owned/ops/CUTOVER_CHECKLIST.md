# Production Cutover Checklist

Cut over only after staging passes smoke tests.

## Before Cutover

- Confirm latest production DB backup exists.
- Confirm upload backup exists.
- Confirm staging can log in with an admin and at least one member.
- Confirm frontend menu behavior matches the requested layout.
- Confirm `app.verdixgreen.com` DNS still points to the intended server.

## Cutover

```bash
cd /opt/eco-factory
docker compose -f docker-compose.prod.yml down

cd /opt/eco-factory-owned/ops
docker compose --env-file .env -f docker-compose.production-owned.yml build
docker compose --env-file .env -f docker-compose.production-owned.yml up -d db
docker exec -i eco-factory-owned-prod-db-1 pg_restore -U eco_user -d eco_factory --clean --if-exists < /root/eco-factory-migration-backups/20260614-084549/eco_factory.dump
docker compose --env-file .env -f docker-compose.production-owned.yml up -d
```

## Rollback

```bash
cd /opt/eco-factory-owned/ops
docker compose --env-file .env -f docker-compose.production-owned.yml down

cd /opt/eco-factory
docker compose -f docker-compose.prod.yml up -d
```

The current old image remains available for rollback until the new owned build
has been operated successfully for a full review cycle.
