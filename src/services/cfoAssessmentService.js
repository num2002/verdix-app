import { isSupabaseConfigured, supabase } from "../lib/supabase";

const STORAGE_KEY = "verdix.cfoAssessments.v1";

function readLocal() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(rows) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

async function currentSession() {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

function normalize(row) {
  return {
    ...row,
    form_data: row.form_data || row.formData || {},
    result: row.result || {},
  };
}

async function listForUser(email) {
  const localRows = readLocal().filter((row) => row.user_email === email).map(normalize);
  const session = await currentSession();
  if (!session) return localRows;

  const { data, error } = await supabase
    .from("cfo_assessments")
    .select("*")
    .eq("user_email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[cfoAssessmentService] Failed to load user assessments", error);
    return localRows;
  }

  return (data || []).map(normalize);
}

async function listAll() {
  const localRows = readLocal().map(normalize);
  const session = await currentSession();
  if (!session) return localRows;

  const { data, error } = await supabase
    .from("cfo_assessments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[cfoAssessmentService] Failed to load assessments", error);
    return localRows;
  }

  return (data || []).map(normalize);
}

async function saveAssessment(payload) {
  const now = new Date().toISOString();
  const row = {
    id: payload.id || Date.now(),
    user_email: payload.user_email,
    organization_name: payload.organization_name,
    reporting_year: payload.reporting_year,
    form_data: payload.form_data,
    result: payload.result,
    status: payload.status || "submitted",
    reviewer_email: payload.reviewer_email || null,
    review_note: payload.review_note || "",
    reviewed_at: payload.reviewed_at || null,
    created_at: payload.created_at || now,
    updated_at: now,
  };

  const localRows = readLocal();
  const nextLocal = localRows.some((item) => String(item.id) === String(row.id))
    ? localRows.map((item) => String(item.id) === String(row.id) ? row : item)
    : [row, ...localRows];
  writeLocal(nextLocal);

  const session = await currentSession();
  if (!session) return row;

  const { error } = await supabase.from("cfo_assessments").upsert(row);
  if (error) console.warn("[cfoAssessmentService] Failed to save assessment", error);
  return row;
}

async function reviewAssessment(id, review) {
  const now = new Date().toISOString();
  const localRows = readLocal();
  const nextLocal = localRows.map((row) => String(row.id) === String(id)
    ? { ...row, ...review, reviewed_at: now, updated_at: now }
    : row
  );
  writeLocal(nextLocal);

  const session = await currentSession();
  if (!session) return nextLocal.find((row) => String(row.id) === String(id));

  const { data, error } = await supabase
    .from("cfo_assessments")
    .update({ ...review, reviewed_at: now, updated_at: now })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.warn("[cfoAssessmentService] Failed to review assessment", error);
    return nextLocal.find((row) => String(row.id) === String(id));
  }

  return normalize(data);
}

export const cfoAssessmentService = {
  listForUser,
  listAll,
  saveAssessment,
  reviewAssessment,
};
