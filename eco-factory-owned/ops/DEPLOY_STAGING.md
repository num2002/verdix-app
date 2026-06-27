# Eco Factory Owned Staging

This staging path runs beside production on port `18080`. It does not replace
the live containers.

## Server Paths

- Source: `/opt/eco-factory-owned`
- Existing production backup: `/root/eco-factory-migration-backups/20260614-084549`
- Staging URL on server: `http://127.0.0.1:18080`

## First Deploy

```bash
cd /opt/eco-factory-owned/ops
cp env.example .env
# Edit .env with real DB_PASSWORD and JWT_SECRET.
docker compose --env-file .env -f docker-compose.staging.yml build
docker compose --env-file .env -f docker-compose.staging.yml up -d db
docker exec -i eco-factory-owned-db-1 pg_restore -U eco_user -d eco_factory --clean --if-exists < /root/eco-factory-migration-backups/20260614-084549/eco_factory.dump
docker compose --env-file .env -f docker-compose.staging.yml up -d
```

## Smoke Tests

```bash
curl -fsS http://127.0.0.1:18080/healthz
curl -fsS http://127.0.0.1:18080/api/v1/config
curl -I http://127.0.0.1:18080/
```

Then test in browser:

- Member login
- Dashboard shows only Eco Factory and EF-WP cards
- Main menu contains Amata Best Waste Awards
- Top nav `หน้าหลัก` opens `https://www.verdixgreen.com/`
- Admin login and user list
- Create/save/submit one application draft
