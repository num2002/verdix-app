# Eco Factory API Contract Draft

Base path:

```text
/api/v1
```

Auth token storage in current frontend:

```text
localStorage: eco_auth_token
Authorization: Bearer <token>
```

## Public / Auth

- `GET /config`
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/verify-email?token=...`
- `POST /auth/resend-verification`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/google`
- `GET /auth/line`

## Current User

- `GET /auth/me`
- `PUT /auth/me`
- `PUT /auth/me/password`
- `POST /auth/me/certificate`
- `GET /auth/me/certificates`

## Eco Factory Applications

- `POST /applications`
- `GET /applications/:id`
- `PUT /applications/:id/step/:step`
- `POST /applications/:id/submit`
- `POST /applications/:id/upload`
- `PUT /applications/:id/self-assessment`
- `DELETE /applications/:id/uploads/:uploadId`
- `GET /applications/:id/pdf`
- `GET /applications/:id/self-assessment/pdf`

## Auditor / Admin Eco Factory

- `GET /auditor/applications`
- `GET /admin/applications`
- `PUT /admin/applications/:id/status`
- `PUT /admin/applications/:id/auditor`

## Waste Award

- `POST /waste-award`
- `GET /waste-award`
- `GET /waste-award/:id`
- `PUT /waste-award/:id/factory`
- `PUT /waste-award/:id/scores`
- `PUT /waste-award/:id/status`
- `GET /waste-award/:id/excel`
- `POST /waste-award/:id/evidence/:criterionNo`
- `DELETE /waste-award/:id/evidence/:fileId`
- `POST /waste-award/:id/feedback`
- `PUT /waste-award/:id/notify`

## Admin Waste Award / Users

- `GET /admin/waste-award`
- `PUT /admin/waste-award/:id/assign`
- `GET /admin/users`
- `POST /admin/users`
- `PUT /admin/users/:id`
- `DELETE /admin/users/:id`

## EF-WP Self Audit

- `POST /wp-self-audits`
- `GET /wp-self-audits`
- `GET /wp-self-audits/:id`
- `DELETE /wp-self-audits/:id`
- `PUT /wp-self-audits/:id/step/:step`
- `POST /wp-self-audits/:id/submit`
- `POST /wp-self-audits/:id/upload`
- `GET /wp-self-audits/:id/pdf`

## Rebuild Priority

1. Auth and user roles: `admin`, `auditor`, `factory`
2. `GET /auth/me` and login/register
3. Waste Award flows, because active data exists
4. Eco Factory applications
5. EF-WP self audit
6. PDF and Excel exports
7. OAuth providers and email flows
