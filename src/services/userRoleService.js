import { isSupabaseConfigured, supabase } from "../lib/supabase";

const STORAGE_KEY = "verdix.userRoles.v1";
const TABLE = "user_roles";
const BOOTSTRAP_ROLES = [
  {
    id: "bootstrap-khomsans",
    email: "khomsans@gmail.com",
    full_name: "Khomsan Suksena",
    organization: "VerdiX Green",
    role: "super_admin",
    status: "active",
    note: "Bootstrap super admin",
  },
  {
    id: "bootstrap-admin",
    email: "admin@verdixgreen.com",
    full_name: "Admin VerdiX",
    organization: "VerdiX Green",
    role: "super_admin",
    status: "active",
    note: "Bootstrap super admin",
  },
  {
    id: "bootstrap-kowit",
    email: "kowit007@gmail.com",
    full_name: "Kowit007",
    organization: "",
    role: "admin",
    status: "active",
    note: "Bootstrap admin",
  },
  {
    id: "bootstrap-witchayakul",
    email: "witchayakul.tw@gmail.com",
    full_name: "Witchayakul",
    organization: "",
    role: "admin",
    status: "active",
    note: "Bootstrap admin",
  },
];

function mergeBootstrap(rows) {
  const map = new Map(BOOTSTRAP_ROLES.map((row) => [row.email, normalize(row)]));
  rows.map(normalize).forEach((row) => map.set(row.email, row));
  return Array.from(map.values());
}

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
  const now = new Date().toISOString();
  return {
    id: row.id || Date.now(),
    email: String(row.email || "").trim().toLowerCase(),
    full_name: row.full_name || "",
    organization: row.organization || "",
    role: row.role || "standard_user",
    status: row.status || "active",
    note: row.note || "",
    created_at: row.created_at || now,
    updated_at: row.updated_at || now,
  };
}

async function listAll() {
  const localRows = mergeBootstrap(readLocal());
  const session = await currentSession();
  if (!session) return localRows;

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[userRoleService] Failed to load user roles", error);
    return localRows;
  }

  return mergeBootstrap(data || []);
}

async function getRoleForEmail(email) {
  const cleanEmail = String(email || "").trim().toLowerCase();
  if (!cleanEmail) return null;

  const localMatch = mergeBootstrap(readLocal()).find((row) => row.email === cleanEmail);
  const session = await currentSession();
  if (!session) return localMatch || null;

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (error) {
    console.warn("[userRoleService] Failed to load current user role", error);
    return localMatch || null;
  }

  return data ? normalize(data) : localMatch || null;
}

async function saveUserRole(payload) {
  const now = new Date().toISOString();
  const row = normalize({
    ...payload,
    updated_at: now,
  });

  if (!row.email) throw new Error("Email is required");

  const localRows = readLocal();
  const nextLocal = localRows.some((item) => String(item.id) === String(row.id) || String(item.email).toLowerCase() === row.email)
    ? localRows.map((item) => (String(item.id) === String(row.id) || String(item.email).toLowerCase() === row.email) ? { ...row, id: item.id || row.id, created_at: item.created_at || row.created_at } : item)
    : [row, ...localRows];
  writeLocal(nextLocal);

  const session = await currentSession();
  if (!session) return row;

  const { data, error } = await supabase
    .from(TABLE)
    .upsert(row, { onConflict: "email" })
    .select()
    .single();

  if (error) {
    console.warn("[userRoleService] Failed to save user role", error);
    return row;
  }

  return normalize(data);
}

async function deleteUserRole(row) {
  const id = row?.id;
  const email = String(row?.email || "").toLowerCase();
  const nextLocal = readLocal().filter((item) => String(item.id) !== String(id) && String(item.email || "").toLowerCase() !== email);
  writeLocal(nextLocal);

  const session = await currentSession();
  if (!session) return true;

  const query = id
    ? supabase.from(TABLE).delete().eq("id", id)
    : supabase.from(TABLE).delete().eq("email", email);
  const { error } = await query;

  if (error) {
    console.warn("[userRoleService] Failed to delete user role", error);
    return false;
  }
  return true;
}

export const userRoleService = {
  listAll,
  getRoleForEmail,
  saveUserRole,
  deleteUserRole,
};
