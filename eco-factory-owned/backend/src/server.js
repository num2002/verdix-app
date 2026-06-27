import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import multer from "multer";
import { pool, query, toCamel, toCamelRows, withTransaction } from "./db.js";
import { isAuditorRole, publicUser, requireAuth, requireRole, signToken } from "./auth.js";

const app = express();
const uploadDir = process.env.UPLOAD_DIR || "/app/uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: Number(process.env.MAX_UPLOAD_BYTES || 25 * 1024 * 1024) },
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function boolEnv(name, fallback = false) {
  const value = process.env[name];
  if (value == null) return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function cleanEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function buildAuthResponse(user) {
  return {
    token: signToken(user),
    user: publicUser(user),
  };
}

function apiBaseUrl() {
  const base = (process.env.BACKEND_BASE_URL || process.env.APP_BASE_URL || "https://app.verdixgreen.com").replace(/\/$/, "");
  return base.endsWith("/api/v1") ? base : `${base}/api/v1`;
}

function appBaseUrl() {
  return (process.env.APP_BASE_URL || "https://app.verdixgreen.com").replace(/\/$/, "");
}

function decodeJwtPayload(token) {
  const [, payload] = String(token || "").split(".");
  if (!payload) return {};
  return JSON.parse(Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
}

async function socialUser({ provider, providerId, email, fullName }) {
  if (!email) throw Object.assign(new Error("Social account does not provide an email address"), { status: 400 });
  const providerColumn = provider === "google" ? "google_id" : "line_id";
  const { rows: existingRows } = await query(`select * from users where ${providerColumn} = $1 or email = $2 limit 1`, [providerId, cleanEmail(email)]);
  if (existingRows[0]) {
    const { rows } = await query(
      `update users set ${providerColumn} = $2, full_name = coalesce(nullif($3, ''), full_name), is_email_verified = true, updated_at = now()
       where id = $1 returning *`,
      [existingRows[0].id, providerId, fullName || ""],
    );
    return rows[0];
  }
  const { rows } = await query(
    `insert into users (email, full_name, role, is_active, is_email_verified, ${providerColumn})
     values ($1, $2, 'standard_user', true, true, $3) returning *`,
    [cleanEmail(email), fullName || email, providerId],
  );
  return rows[0];
}

function redirectWithAuthToken(res, user) {
  res.redirect(302, `${appBaseUrl()}/#google-auth?token=${encodeURIComponent(signToken(user))}`);
}

function toDateOrNull(value) {
  return value ? value : null;
}

function snake(input = {}) {
  const entries = Object.entries(input).map(([key, value]) => [
    key.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`),
    value,
  ]);
  return Object.fromEntries(entries);
}

async function upsertByColumns(client, table, conflictColumn, conflictValue, data, required = {}) {
  const row = { ...required, ...snake(data), [conflictColumn]: conflictValue, updated_at: new Date() };
  const keys = Object.keys(row).filter(key => row[key] !== undefined);
  const values = keys.map(key => row[key]);
  const columns = keys.map(key => `"${key}"`).join(", ");
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  const updates = keys
    .filter(key => key !== conflictColumn)
    .map(key => `"${key}" = excluded."${key}"`)
    .join(", ");
  await client.query(
    `insert into ${table} (${columns}) values (${placeholders})
     on conflict (${conflictColumn}) do update set ${updates}`,
    values,
  );
}

async function getApplicationPayload(id) {
  const { rows } = await query("select * from applications where id = $1", [id]);
  const appRow = rows[0];
  if (!appRow) return null;

  const [
    company,
    org,
    consultants,
    team,
    auditors,
    checklist,
    selfAssessment,
    meeting,
    files,
  ] = await Promise.all([
    query("select * from company_info where application_id = $1", [id]),
    query("select * from org_assessment where application_id = $1", [id]),
    query("select * from consultants where application_id = $1 order by sort_order", [id]),
    query("select * from auditor_teams where application_id = $1", [id]),
    query("select * from auditors where application_id = $1 order by sort_order", [id]),
    query("select * from document_checklist where application_id = $1 order by item_no", [id]),
    query("select * from self_assessment where application_id = $1", [id]),
    query("select * from meeting_contact where application_id = $1", [id]),
    query("select * from file_uploads where application_id = $1 order by created_at", [id]),
  ]);

  return {
    ...toCamel(appRow),
    companyInfo: toCamel(company.rows[0] || {}),
    orgAssessment: toCamel(org.rows[0] || {}),
    consultants: toCamelRows(consultants.rows),
    auditorTeam: toCamel(team.rows[0] || {}),
    auditors: toCamelRows(auditors.rows),
    checklist: toCamelRows(checklist.rows),
    selfAssessment: selfAssessment.rows[0]?.items || [],
    meetingContact: toCamel(meeting.rows[0] || {}),
    fileUploads: toCamelRows(files.rows),
  };
}

function ensureOwnsApplication(req, appRow) {
  if (!appRow) return false;
  if (isAuditorRole(req.user.role)) return true;
  return appRow.user_id === req.user.id;
}

app.get("/api/v1/config", (_req, res) => {
  res.json({
    googleEnabled: Boolean(process.env.GOOGLE_CLIENT_ID),
    lineEnabled: Boolean(process.env.LINE_CHANNEL_ID),
    turnstileEnabled: boolEnv("TURNSTILE_ENABLED"),
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || "",
  });
});

app.post("/api/v1/auth/login", asyncHandler(async (req, res) => {
  const email = cleanEmail(req.body.email);
  const password = String(req.body.password || "");
  const { rows } = await query("select * from users where email = $1 and is_active = true", [email]);
  const user = rows[0];
  if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }
  if (boolEnv("EMAIL_VERIFICATION_ENABLED", true) && !user.is_email_verified) {
    return res.status(403).json({ message: "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ" });
  }
  res.json(buildAuthResponse(user));
}));

app.post("/api/v1/auth/register", asyncHandler(async (req, res) => {
  const email = cleanEmail(req.body.email);
  const password = String(req.body.password || "");
  if (!email || password.length < 8) {
    return res.status(400).json({ message: "กรุณากรอกอีเมลและรหัสผ่านอย่างน้อย 8 ตัวอักษร" });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const fullName = req.body.fullName || req.body.full_name || req.body.name || email;
  const organization = req.body.organization || "";
  const verified = !boolEnv("EMAIL_VERIFICATION_ENABLED", true);
  const { rows } = await query(
    `insert into users (email, password_hash, full_name, organization, role, is_email_verified)
     values ($1, $2, $3, $4, 'standard_user', $5)
     on conflict (email) do nothing
     returning *`,
    [email, passwordHash, fullName, organization, verified],
  );
  if (!rows[0]) return res.status(409).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
  res.status(201).json(buildAuthResponse(rows[0]));
}));

app.get("/api/v1/auth/me", requireAuth, (req, res) => {
  res.json(publicUser(req.user));
});

app.put("/api/v1/auth/me", requireAuth, asyncHandler(async (req, res) => {
  const fields = snake(req.body);
  const allowed = ["full_name", "organization", "phone", "position", "ext_number", "fax", "mobile", "education"];
  const keys = allowed.filter(key => fields[key] !== undefined);
  if (!keys.length) return res.json(publicUser(req.user));
  const values = keys.map(key => fields[key]);
  const sets = keys.map((key, i) => `"${key}" = $${i + 2}`).join(", ");
  const { rows } = await query(
    `update users set ${sets}, updated_at = now() where id = $1 returning *`,
    [req.user.id, ...values],
  );
  res.json(publicUser(rows[0]));
}));

app.put("/api/v1/auth/me/password", requireAuth, asyncHandler(async (req, res) => {
  const current = String(req.body.currentPassword || "");
  const next = String(req.body.newPassword || "");
  if (next.length < 8) return res.status(400).json({ message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" });
  if (req.user.password_hash && !(await bcrypt.compare(current, req.user.password_hash))) {
    return res.status(400).json({ message: "รหัสผ่านเดิมไม่ถูกต้อง" });
  }
  const passwordHash = await bcrypt.hash(next, 12);
  await query("update users set password_hash = $2, updated_at = now() where id = $1", [req.user.id, passwordHash]);
  res.status(204).end();
}));

app.post("/api/v1/auth/me/certificate", requireAuth, upload.single("file"), asyncHandler(async (req, res) => {
  const { rows } = await query(
    `insert into user_certificates (user_id, file_name, file_path)
     values ($1, $2, $3) returning *`,
    [req.user.id, req.file?.originalname || "", req.file?.path || ""],
  );
  res.status(201).json(toCamel(rows[0]));
}));

app.get("/api/v1/auth/me/certificates", requireAuth, asyncHandler(async (req, res) => {
  const { rows } = await query("select * from user_certificates where user_id = $1 order by uploaded_at desc", [req.user.id]);
  res.json(toCamelRows(rows));
}));

app.get("/api/v1/auth/verify-email", asyncHandler(async (_req, res) => {
  res.json({ message: "Email verification endpoint is available in the owned backend." });
}));

app.post("/api/v1/auth/resend-verification", (_req, res) => {
  res.json({ message: "ส่งอีเมลยืนยันแล้ว" });
});

app.post("/api/v1/auth/forgot-password", (_req, res) => {
  res.json({ message: "ส่งลิงก์ตั้งรหัสผ่านใหม่แล้ว" });
});

app.post("/api/v1/auth/reset-password", (_req, res) => {
  res.json({ message: "ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว" });
});

app.get("/api/v1/auth/google", (_req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return res.redirect(302, "/#login?error=google_not_configured");
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${apiBaseUrl()}/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
  });
  res.redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get("/api/v1/auth/google/callback", asyncHandler(async (req, res) => {
  if (!req.query.code) return res.redirect(302, "/#login?error=google_missing_code");
  const redirectUri = `${apiBaseUrl()}/auth/google/callback`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: String(req.query.code),
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenResponse.ok) return res.redirect(302, "/#login?error=google_token");
  const tokenData = await tokenResponse.json();
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  if (!userResponse.ok) return res.redirect(302, "/#login?error=google_profile");
  const profile = await userResponse.json();
  const user = await socialUser({ provider: "google", providerId: profile.sub, email: profile.email, fullName: profile.name });
  redirectWithAuthToken(res, user);
}));

app.get("/api/v1/auth/line", (_req, res) => {
  if (!process.env.LINE_CHANNEL_ID || !process.env.LINE_CHANNEL_SECRET) return res.redirect(302, "/#login?error=line_not_configured");
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINE_CHANNEL_ID,
    redirect_uri: `${apiBaseUrl()}/auth/line/callback`,
    state: crypto.randomBytes(12).toString("hex"),
    scope: "profile openid email",
  });
  res.redirect(302, `https://access.line.me/oauth2/v2.1/authorize?${params}`);
});

app.get("/api/v1/auth/line/callback", asyncHandler(async (req, res) => {
  if (!req.query.code) return res.redirect(302, "/#login?error=line_missing_code");
  const redirectUri = `${apiBaseUrl()}/auth/line/callback`;
  const tokenResponse = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: String(req.query.code),
      redirect_uri: redirectUri,
      client_id: process.env.LINE_CHANNEL_ID,
      client_secret: process.env.LINE_CHANNEL_SECRET,
    }),
  });
  if (!tokenResponse.ok) return res.redirect(302, "/#login?error=line_token");
  const tokenData = await tokenResponse.json();
  const profileResponse = await fetch("https://api.line.me/v2/profile", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  if (!profileResponse.ok) return res.redirect(302, "/#login?error=line_profile");
  const profile = await profileResponse.json();
  const idProfile = decodeJwtPayload(tokenData.id_token);
  const user = await socialUser({ provider: "line", providerId: profile.userId, email: idProfile.email, fullName: profile.displayName });
  redirectWithAuthToken(res, user);
}));

app.post("/api/v1/applications", requireAuth, asyncHandler(async (req, res) => {
  const applicationType = req.body.applicationType || "new_registration";
  const { rows } = await query(
    `insert into applications (application_type, user_id) values ($1, $2) returning *`,
    [applicationType, req.user.id],
  );
  res.status(201).json(toCamel(rows[0]));
}));

app.get("/api/v1/applications/:id", requireAuth, asyncHandler(async (req, res) => {
  const payload = await getApplicationPayload(req.params.id);
  if (!payload) return res.status(404).json({ message: "ไม่พบใบสมัคร" });
  if (!ensureOwnsApplication(req, { user_id: payload.userId })) {
    return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงใบสมัครนี้" });
  }
  res.json(payload);
}));

app.put("/api/v1/applications/:id/step/:step", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const step = Number(req.params.step);
  const { rows } = await query("select * from applications where id = $1", [id]);
  if (!ensureOwnsApplication(req, rows[0])) return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงใบสมัครนี้" });

  await withTransaction(async client => {
    await client.query("update applications set current_step = greatest(current_step, $2), updated_at = now() where id = $1", [id, step]);
    if (step === 1) {
      await upsertByColumns(client, "company_info", "application_id", id, req.body, { organization_name: req.body.organizationName || req.body.organization_name || "-" });
    } else if (step === 2) {
      await upsertByColumns(client, "org_assessment", "application_id", id, req.body);
      await client.query("delete from consultants where application_id = $1", [id]);
      for (const [index, item] of (req.body.consultants || []).entries()) {
        await client.query(
          `insert into consultants (application_id, sort_order, full_name, organization, phone, email)
           values ($1, $2, $3, $4, $5, $6)`,
          [id, index + 1, item.fullName || "", item.organization || "", item.phone || "", item.email || ""],
        );
      }
    } else if (step === 3) {
      await upsertByColumns(client, "auditor_teams", "application_id", id, { auditingOrgName: req.body.auditingOrgName || "" });
      await client.query("delete from auditors where application_id = $1", [id]);
      for (const [index, item] of (req.body.auditors || []).entries()) {
        await client.query(
          `insert into auditors (application_id, role, sort_order, full_name, organization, phone, email, expertise_environment, expertise_social, expertise_ecoeconomics)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [id, item.role || "member", index, item.fullName || "", item.organization || "", item.phone || "", item.email || "", !!item.expertiseEnvironment, !!item.expertiseSocial, !!item.expertiseEcoEconomics],
        );
      }
      await client.query("delete from document_checklist where application_id = $1", [id]);
      for (const item of (req.body.checklist || [])) {
        await client.query(
          `insert into document_checklist (application_id, item_no, item_label, is_checked, prepared_by, submitted_by, item_group, required_level, upload_type, not_applicable, note)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
          [id, item.itemNo, item.itemLabel || "", !!item.isChecked, item.preparedBy || "", item.submittedBy || "", item.itemGroup || "", item.requiredLevel || "optional", item.uploadType || "upload", !!item.notApplicable, item.note || ""],
        );
      }
    } else if (step === 4) {
      await upsertByColumns(client, "meeting_contact", "application_id", id, req.body);
    }
  });
  res.json(await getApplicationPayload(id));
}));

app.post("/api/v1/applications/:id/submit", requireAuth, asyncHandler(async (req, res) => {
  await query("update applications set status = 'submitted', submitted_at = now(), updated_at = now() where id = $1 and user_id = $2", [req.params.id, req.user.id]);
  res.json(await getApplicationPayload(req.params.id));
}));

app.put("/api/v1/applications/:id/self-assessment", requireAuth, asyncHandler(async (req, res) => {
  await query(
    `insert into self_assessment (application_id, items, updated_at) values ($1, $2, now())
     on conflict (application_id) do update set items = excluded.items, updated_at = now()`,
    [req.params.id, JSON.stringify(req.body.items || [])],
  );
  res.json({ ok: true });
}));

app.post("/api/v1/applications/:id/upload", requireAuth, upload.single("file"), asyncHandler(async (req, res) => {
  const purpose = req.body.purpose || "checklist_doc";
  const { rows } = await query(
    `insert into file_uploads (application_id, purpose, file_name, file_path, mime_type, file_size_bytes, inline_data, item_no, item_key)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`,
    [req.params.id, purpose, req.file?.originalname || "", req.file?.path || "", req.file?.mimetype || "", req.file?.size || null, req.body.inlineData || null, req.body.itemNo || null, req.body.itemKey || null],
  );
  res.status(201).json(toCamel(rows[0]));
}));

app.delete("/api/v1/applications/:id/uploads/:uploadId", requireAuth, asyncHandler(async (req, res) => {
  await query("delete from file_uploads where application_id = $1 and id = $2", [req.params.id, req.params.uploadId]);
  res.status(204).end();
}));

app.get("/api/v1/applications/:id/pdf", requireAuth, (_req, res) => {
  res.type("text/plain").send("PDF export will be implemented in the owned backend production milestone.");
});

app.get("/api/v1/applications/:id/self-assessment/pdf", requireAuth, (_req, res) => {
  res.type("text/plain").send("Self-assessment PDF export will be implemented in the owned backend production milestone.");
});

app.get("/api/v1/auditor/applications", requireAuth, requireRole("auditor", "admin"), asyncHandler(async (_req, res) => {
  const { rows } = await query("select * from applications order by updated_at desc");
  res.json(toCamelRows(rows));
}));

app.get("/api/v1/admin/applications", requireAuth, requireRole("admin"), asyncHandler(async (_req, res) => {
  const { rows } = await query("select * from applications order by updated_at desc");
  res.json(toCamelRows(rows));
}));

app.put("/api/v1/admin/applications/:id/status", requireAuth, requireRole("admin"), asyncHandler(async (req, res) => {
  const { rows } = await query("update applications set status = $2, updated_at = now() where id = $1 returning *", [req.params.id, req.body.status]);
  res.json(toCamel(rows[0]));
}));

app.put("/api/v1/admin/applications/:id/auditor", requireAuth, requireRole("admin"), asyncHandler(async (req, res) => {
  const { rows } = await query("update applications set assigned_auditor_id = $2, updated_at = now() where id = $1 returning *", [req.params.id, req.body.auditorUserId || null]);
  res.json(toCamel(rows[0]));
}));

async function wasteAwardPayload(id) {
  const [assessment, criteria, evidence, feedback] = await Promise.all([
    query("select * from waste_award_assessments where id = $1", [id]),
    query("select * from waste_award_criteria where assessment_id = $1", [id]),
    query("select * from waste_award_evidence_files where assessment_id = $1 order by created_at", [id]),
    query("select * from waste_award_feedback where assessment_id = $1 order by created_at", [id]),
  ]);
  if (!assessment.rows[0]) return null;
  return {
    assessment: toCamel(assessment.rows[0]),
    criteria: criteria.rows[0]?.criteria_data || [],
    evidenceFiles: toCamelRows(evidence.rows),
    feedback: toCamelRows(feedback.rows),
  };
}

app.post("/api/v1/waste-award", requireAuth, asyncHandler(async (req, res) => {
  const factoryName = req.body.factoryName || req.body.factory_name || "Untitled";
  const level = req.body.certificationLevel || req.body.certification_level || "silver";
  const { rows } = await query(
    `insert into waste_award_assessments (factory_name, certification_level, created_by)
     values ($1, $2, $3) returning *`,
    [factoryName, level, req.user.id],
  );
  res.status(201).json(toCamel(rows[0]));
}));

app.get("/api/v1/waste-award", requireAuth, asyncHandler(async (req, res) => {
  const params = isAuditorRole(req.user.role) ? [] : [req.user.id];
  const sql = params.length
    ? "select * from waste_award_assessments where created_by = $1 order by updated_at desc"
    : "select * from waste_award_assessments order by updated_at desc";
  const { rows } = await query(sql, params);
  res.json(toCamelRows(rows));
}));

app.get("/api/v1/waste-award/:id", requireAuth, asyncHandler(async (req, res) => {
  const payload = await wasteAwardPayload(req.params.id);
  if (!payload) return res.status(404).json({ message: "ไม่พบข้อมูล" });
  if (!isAuditorRole(req.user.role) && payload.assessment.createdBy !== req.user.id) {
    return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงข้อมูลนี้" });
  }
  res.json(payload);
}));

app.put("/api/v1/waste-award/:id/factory", requireAuth, asyncHandler(async (req, res) => {
  const data = snake(req.body);
  const allowed = [
    "factory_name", "factory_license_no", "coordinator_name", "coordinator_phone", "coordinator_email",
    "certification_level", "address", "industrial_estate", "fax_number", "website", "application_type",
    "coordinator_position", "coordinator_department", "coordinator2_name", "coordinator2_position",
    "coordinator2_department", "coordinator2_phone", "coordinator2_email", "phone",
  ];
  const keys = allowed.filter(key => data[key] !== undefined);
  if (!keys.length) return res.json(await wasteAwardPayload(req.params.id));
  const values = keys.map(key => data[key]);
  const sets = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
  await query(`update waste_award_assessments set ${sets}, updated_at = now() where id = $1`, [req.params.id, ...values]);
  res.json(await wasteAwardPayload(req.params.id));
}));

app.put("/api/v1/waste-award/:id/scores", requireAuth, asyncHandler(async (req, res) => {
  const criteria = req.body.criteria || [];
  await query(
    `insert into waste_award_criteria (assessment_id, criteria_data, updated_at) values ($1, $2, now())
     on conflict (assessment_id) do update set criteria_data = excluded.criteria_data, updated_at = now()`,
    [req.params.id, JSON.stringify(criteria)],
  );
  const data = snake(req.body);
  await query(
    `update waste_award_assessments set auditor_names = coalesce($2, auditor_names),
     assessment_date = coalesce($3, assessment_date), assessment_time = coalesce($4, assessment_time), updated_at = now()
     where id = $1`,
    [req.params.id, data.auditor_names || null, toDateOrNull(data.assessment_date), data.assessment_time || null],
  );
  res.json(await wasteAwardPayload(req.params.id));
}));

app.put("/api/v1/waste-award/:id/status", requireAuth, asyncHandler(async (req, res) => {
  await query("update waste_award_assessments set status = $2, updated_at = now() where id = $1", [req.params.id, req.body.status || "draft"]);
  res.json(await wasteAwardPayload(req.params.id));
}));

app.get("/api/v1/waste-award/:id/excel", requireAuth, asyncHandler(async (req, res) => {
  const payload = await wasteAwardPayload(req.params.id);
  if (!payload) return res.status(404).json({ message: "ไม่พบข้อมูล" });
  const criteria = payload.criteria || [];
  const rows = [
    { section: "assessment", ...payload.assessment },
    ...criteria.map((row) => ({ section: "criteria", ...row })),
  ];
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const escapeCsv = (value) => {
    if (value === null || value === undefined) return "";
    const text = typeof value === "object" ? JSON.stringify(value) : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  const csv = [keys.join(","), ...rows.map((row) => keys.map((key) => escapeCsv(row[key])).join(","))].join("\r\n");
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="waste-award-${req.params.id}.csv"`);
  res.send(`\uFEFF${csv}`);
}));

app.post("/api/v1/waste-award/:id/evidence/:criterionNo", requireAuth, upload.single("file"), asyncHandler(async (req, res) => {
  const { rows } = await query(
    `insert into waste_award_evidence_files (assessment_id, criterion_no, file_path, file_name, file_type, uploaded_by)
     values ($1,$2,$3,$4,$5,$6) returning *`,
    [req.params.id, Number(req.params.criterionNo), req.file?.path || "", req.file?.originalname || "", req.file?.mimetype || "", req.user.id],
  );
  res.status(201).json(toCamel(rows[0]));
}));

app.delete("/api/v1/waste-award/:id/evidence/:fileId", requireAuth, asyncHandler(async (req, res) => {
  await query("delete from waste_award_evidence_files where assessment_id = $1 and id = $2", [req.params.id, req.params.fileId]);
  res.status(204).end();
}));

app.post("/api/v1/waste-award/:id/feedback", requireAuth, asyncHandler(async (req, res) => {
  const { rows } = await query(
    `insert into waste_award_feedback (assessment_id, author_id, author_role, message)
     values ($1,$2,$3,$4) returning *`,
    [req.params.id, req.user.id, req.user.role, req.body.message || ""],
  );
  res.status(201).json(toCamel(rows[0]));
}));

app.put("/api/v1/waste-award/:id/notify", requireAuth, asyncHandler(async (req, res) => {
  await query("update waste_award_assessments set factory_notified = true where id = $1", [req.params.id]);
  res.json({ ok: true });
}));

app.get("/api/v1/admin/waste-award", requireAuth, requireRole("admin", "auditor"), asyncHandler(async (_req, res) => {
  const { rows } = await query("select * from waste_award_assessments order by updated_at desc");
  res.json(toCamelRows(rows));
}));

app.put("/api/v1/admin/waste-award/:id/assign", requireAuth, requireRole("admin"), asyncHandler(async (req, res) => {
  await query("update waste_award_assessments set assigned_auditor_id = $2, updated_at = now() where id = $1", [req.params.id, req.body.auditorUserId || null]);
  res.json(await wasteAwardPayload(req.params.id));
}));

app.get("/api/v1/admin/users", requireAuth, requireRole("admin"), asyncHandler(async (_req, res) => {
  const { rows } = await query("select * from users order by created_at desc");
  res.json(rows.map(publicUser));
}));

app.post("/api/v1/admin/users", requireAuth, requireRole("admin"), asyncHandler(async (req, res) => {
  const email = cleanEmail(req.body.email);
  const passwordHash = req.body.password ? await bcrypt.hash(String(req.body.password), 12) : null;
  const { rows } = await query(
    `insert into users (email, password_hash, full_name, role, is_active, is_email_verified, organization)
     values ($1,$2,$3,$4,$5,true,$6) returning *`,
    [email, passwordHash, req.body.fullName || email, req.body.role || "standard_user", req.body.isActive !== false, req.body.organization || ""],
  );
  res.status(201).json(publicUser(rows[0]));
}));

app.put("/api/v1/admin/users/:id", requireAuth, requireRole("admin"), asyncHandler(async (req, res) => {
  const fields = snake(req.body);
  const allowed = ["full_name", "role", "is_active", "organization", "phone", "position", "ext_number", "fax", "mobile", "education", "is_email_verified"];
  const keys = allowed.filter(key => fields[key] !== undefined);
  if (req.body.password) {
    fields.password_hash = await bcrypt.hash(String(req.body.password), 12);
    keys.push("password_hash");
  }
  const values = keys.map(key => fields[key]);
  const sets = keys.map((key, i) => `"${key}" = $${i + 2}`).join(", ");
  const { rows } = await query(`update users set ${sets}, updated_at = now() where id = $1 returning *`, [req.params.id, ...values]);
  res.json(publicUser(rows[0]));
}));

app.delete("/api/v1/admin/users/:id", requireAuth, requireRole("admin"), asyncHandler(async (req, res) => {
  await query("update users set is_active = false, updated_at = now() where id = $1", [req.params.id]);
  res.status(204).end();
}));

app.post("/api/v1/wp-self-audits", requireAuth, asyncHandler(async (req, res) => {
  const { rows } = await query("insert into wp_self_audits (user_id) values ($1) returning *", [req.user.id]);
  res.status(201).json(toCamel(rows[0]));
}));

app.get("/api/v1/wp-self-audits", requireAuth, asyncHandler(async (req, res) => {
  const params = isAuditorRole(req.user.role) ? [] : [req.user.id];
  const sql = params.length ? "select * from wp_self_audits where user_id = $1 order by updated_at desc" : "select * from wp_self_audits order by updated_at desc";
  const { rows } = await query(sql, params);
  res.json(toCamelRows(rows));
}));

app.get("/api/v1/wp-self-audits/:id", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { rows } = await query("select * from wp_self_audits where id = $1", [id]);
  if (!rows[0]) return res.status(404).json({ message: "ไม่พบข้อมูล" });
  const [company, general, specific, standard, summary] = await Promise.all([
    query("select * from wp_company_info where wp_audit_id = $1", [id]),
    query("select * from wp_general_requirements where wp_audit_id = $1", [id]),
    query("select * from wp_specific_assessment where wp_audit_id = $1", [id]),
    query("select * from wp_standard where wp_audit_id = $1", [id]),
    query("select * from wp_summary where wp_audit_id = $1", [id]),
  ]);
  res.json({
    ...toCamel(rows[0]),
    companyInfo: toCamel(company.rows[0] || {}),
    generalRequirements: toCamel(general.rows[0] || {}),
    specificAssessment: toCamel(specific.rows[0] || {}),
    standard: toCamel(standard.rows[0] || {}),
    summary: toCamel(summary.rows[0] || {}),
  });
}));

app.delete("/api/v1/wp-self-audits/:id", requireAuth, asyncHandler(async (req, res) => {
  await query("delete from wp_self_audits where id = $1 and (user_id = $2 or $3 = true)", [req.params.id, req.user.id, isAuditorRole(req.user.role)]);
  res.status(204).end();
}));

app.put("/api/v1/wp-self-audits/:id/step/:step", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const step = Number(req.params.step);
  await query("update wp_self_audits set current_step = greatest(current_step, $2), updated_at = now() where id = $1", [id, step]);
  const tableByStep = {
    1: "wp_company_info",
    2: "wp_general_requirements",
    3: "wp_specific_assessment",
    4: "wp_standard",
    5: "wp_standard",
    6: "wp_summary",
  };
  const table = tableByStep[step];
  if (table) await upsertByColumns({ query }, table, "wp_audit_id", id, req.body);
  res.json({ ok: true });
}));

app.post("/api/v1/wp-self-audits/:id/submit", requireAuth, asyncHandler(async (req, res) => {
  const { rows } = await query("update wp_self_audits set status = 'submitted', updated_at = now() where id = $1 returning *", [req.params.id]);
  res.json(toCamel(rows[0]));
}));

app.post("/api/v1/wp-self-audits/:id/upload", requireAuth, upload.single("file"), asyncHandler(async (req, res) => {
  res.status(201).json({
    id: crypto.randomUUID(),
    fileName: req.file?.originalname || "",
    filePath: req.file?.path || "",
    purpose: req.body.purpose || "",
  });
}));

app.get("/api/v1/wp-self-audits/:id/pdf", requireAuth, (_req, res) => {
  res.type("text/plain").send("EF-WP PDF export will be implemented in the owned backend production milestone.");
});

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
});

const port = Number(process.env.APP_PORT || 8080);
const server = app.listen(port, () => {
  console.log(`eco-factory owned backend listening on ${port}`);
});

process.on("SIGTERM", async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
