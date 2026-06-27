# Eco Factory Migration Plan

## Current Production

- Public URL: `https://app.verdixgreen.com`
- Server: `157.85.108.152`
- Deploy directory: `/opt/eco-factory`
- Compose file: `/opt/eco-factory/docker-compose.prod.yml`
- Runtime:
  - `eco-factory-frontend-1`
  - `eco-factory-backend-1`
  - `eco-factory-db-1`
- Backend image: `registry.gitlab.com/bst-tech/verdixgreen-eco-factory-app/backend:1b5a05ea`
- Frontend image: `registry.gitlab.com/bst-tech/verdixgreen-eco-factory-app/frontend:1b5a05ea`
- Database: PostgreSQL `eco_factory`

## Backup Created

Remote backup directory:

```text
/root/eco-factory-migration-backups/20260614-084549
```

Local non-secret artifacts:

```text
C:\Projects\virdixgreen\eco-factory-migration
```

Backed up remotely:

- PostgreSQL custom dump: `eco_factory.dump`
- PostgreSQL schema: `schema.sql`
- Upload volume archive: `uploads.tar.gz`
- Frontend deployed files: `frontend-html.tar.gz`
- Compose file: `docker-compose.prod.yml`
- Secret env file: `env.production.secret`
- Redacted env file: `env.production.redacted`
- Checksums: `SHA256SUMS`

Do not commit `env.production.secret`.

## Current Data Counts

```text
applications=6
users=9
waste_award_assessments=2
wp_self_audits=1
file_uploads=0
```

## Database Tables

- `users`
- `applications`
- `company_info`
- `org_assessment`
- `consultants`
- `auditor_teams`
- `auditors`
- `document_checklist`
- `self_assessment`
- `meeting_contact`
- `file_uploads`
- `user_certificates`
- `email_verifications`
- `password_reset_tokens`
- `waste_award_assessments`
- `waste_award_criteria`
- `waste_award_evidence_files`
- `waste_award_feedback`
- `wp_self_audits`
- `wp_company_info`
- `wp_general_requirements`
- `wp_specific_assessment`
- `wp_standard`
- `wp_summary`

## Recommended Migration Path

1. Keep current production running.
2. Create a new repository owned by `num2002`, for example:
   - `num2002/eco-factory-app`
3. Rebuild backend source under our control.
   - Use existing database schema as the contract.
   - Keep API routes compatible with the current frontend where possible.
4. Rebuild frontend source under our control.
   - Current frontend can be used as behavioral reference, but not as a clean source base.
5. Build new Docker images under an owned registry:
   - `ghcr.io/num2002/eco-factory-backend`
   - `ghcr.io/num2002/eco-factory-frontend`
6. Deploy to a staging stack first.
7. Restore a copy of the production database dump into staging.
8. Test auth, Eco Factory application flow, Waste Award, EF-WP, admin, and exports.
9. Rotate secrets before production cutover.
10. Switch production compose images to the new registry and restart.

## Secret Rotation Checklist

Rotate after the new stack is ready:

- `JWT_SECRET`
- `DB_PASSWORD`
- Google OAuth secret
- LINE channel secret
- Turnstile secret
- Registry/deploy tokens
- Admin passwords

## Notes

- The current backend is a compiled binary at `/app/eco-factory-api` inside the container. It is not suitable for direct logic edits.
- The current `/opt/eco-factory` git working tree is incomplete/deleted in many paths, so it should not be treated as a healthy source tree.
- Frontend hotfixes made directly in the running container will be lost if the old frontend image is pulled/restarted from scratch.
