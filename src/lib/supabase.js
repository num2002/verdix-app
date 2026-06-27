import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function getUserRole(user) {
  const email = user?.email?.toLowerCase();
  if (email === "admin@verdixgreen.com" || email === "khomsans@gmail.com") return "super_admin";
  return user?.app_metadata?.role || user?.user_metadata?.role || "standard_user";
}

export function isAdminRole(role) {
  return role === "super_admin" || role === "admin";
}

export function isAdminUser(user) {
  return isAdminRole(getUserRole(user));
}
