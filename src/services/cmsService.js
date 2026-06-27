import { isSupabaseConfigured, supabase } from "../lib/supabase";

const keys = {
  articles: "verdix.articles",
  documents: "verdix.documents",
  experts: "verdix.experts",
  slides: "verdix.heroSlides",
  menus: "verdix.menus",
  footer: "verdix.footer"
};

function readLocal(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

async function hasAuthSession() {
  if (!isSupabaseConfigured) return false;
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session);
}

async function list(table, fallback) {
  if (!isSupabaseConfigured) return readLocal(keys[table], fallback);

  const { data, error } = await supabase.from(table).select("*").order("id", { ascending: true });
  if (error) {
    console.warn(`[cmsService] Failed to load ${table}`, error);
    return readLocal(keys[table], fallback);
  }

  return data?.length ? data : fallback;
}

async function replaceAll(table, rows) {
  writeLocal(keys[table], rows);
  const dbRows = table === "menus"
    ? rows.map(({ eco_tab, carbon_tab, ...row }) => row)
    : rows;

  if (!isSupabaseConfigured) return rows;
  if (!(await hasAuthSession())) return rows;

  const { error: deleteError } = await supabase.from(table).delete().neq("id", -1);
  if (deleteError) {
    console.warn(`[cmsService] Failed to clear ${table}`, deleteError);
    return rows;
  }

  if (dbRows.length) {
    const { error: insertError } = await supabase.from(table).insert(dbRows);
    if (insertError) console.warn(`[cmsService] Failed to save ${table}`, insertError);
  }

  return rows;
}

async function getFooter(fallback) {
  if (!isSupabaseConfigured) return readLocal(keys.footer, fallback);

  const { data, error } = await supabase
    .from("footer_settings")
    .select("settings")
    .eq("id", "main")
    .maybeSingle();

  if (error) {
    console.warn("[cmsService] Failed to load footer", error);
    return readLocal(keys.footer, fallback);
  }

  let merged = data?.settings ? { ...fallback, ...data.settings } : readLocal(keys.footer, fallback);
  // Auto-migrate: if stored Supabase data lacks email2 it's the old schema —
  // force-apply the new contact defaults so stale values don't leak through.
  if (data?.settings && !data.settings.email2) {
    merged = {
      ...merged,
      email: fallback.email,
      email2: fallback.email2,
      phone: fallback.phone,
      location2: fallback.location2,
    };
  }
  return merged;
}

async function saveFooter(footer) {
  writeLocal(keys.footer, footer);

  if (!isSupabaseConfigured) return footer;
  if (!(await hasAuthSession())) return footer;

  const { error } = await supabase
    .from("footer_settings")
    .upsert({ id: "main", settings: footer, updated_at: new Date().toISOString() });

  if (error) console.warn("[cmsService] Failed to save footer", error);
  return footer;
}

export const cmsService = {
  list,
  replaceAll,
  getFooter,
  saveFooter,
  isSupabaseConfigured
};
