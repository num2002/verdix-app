import { isSupabaseConfigured, supabase } from "../lib/supabase";

const STORAGE_KEY = "verdix.tgiSurveyResponses.v1";
const TABLE = "tgi_survey_responses";

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
    raw_data: row.raw_data || {},
    overall_score: Number(row.overall_score || 0),
    awareness_score: Number(row.awareness_score || 0),
    participation_score: Number(row.participation_score || 0),
    behavior_score: Number(row.behavior_score || 0),
  };
}

async function listAll() {
  const localRows = readLocal().map(normalize);
  const session = await currentSession();
  if (!session) return localRows;

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[tgiSurveyService] Failed to load responses", error);
    return localRows;
  }

  return (data || []).map(normalize);
}

async function saveResponse(payload) {
  const now = new Date().toISOString();
  const row = normalize({
    id: payload.id || Date.now(),
    respondent_name: payload.respondent_name || "",
    community: payload.community || "",
    organization: payload.organization || "TGI",
    overall_score: payload.overall_score,
    awareness_score: payload.awareness_score,
    participation_score: payload.participation_score,
    behavior_score: payload.behavior_score,
    csr_focus: payload.csr_focus || "",
    suggestion: payload.suggestion || "",
    raw_data: payload.raw_data || {},
    created_at: payload.created_at || now,
    updated_at: now,
  });

  const localRows = readLocal();
  const nextLocal = localRows.some((item) => String(item.id) === String(row.id))
    ? localRows.map((item) => String(item.id) === String(row.id) ? row : item)
    : [row, ...localRows];
  writeLocal(nextLocal);

  if (!isSupabaseConfigured) return row;

  const { error } = await supabase.from(TABLE).insert(row);
  if (error) console.warn("[tgiSurveyService] Failed to save response", error);
  return row;
}

async function importResponses(rows) {
  const saved = [];
  for (const row of rows) {
    saved.push(await saveResponse(row));
  }
  return saved;
}

async function deleteResponse(id) {
  const nextLocal = readLocal().filter((row) => String(row.id) !== String(id));
  writeLocal(nextLocal);

  const session = await currentSession();
  if (!session) return true;

  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) {
    console.warn("[tgiSurveyService] Failed to delete response", error);
    return false;
  }
  return true;
}

export const tgiSurveyService = {
  listAll,
  saveResponse,
  importResponses,
  deleteResponse,
};
