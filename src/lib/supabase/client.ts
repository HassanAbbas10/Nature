import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase credentials are not configured.");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

let cachedClient: ReturnType<typeof createClient> | null = null;
export function getSupabaseClient() {
  if (!cachedClient) {
    cachedClient = createClient();
  }
  return cachedClient;
}

export const supabaseClient = getSupabaseClient();
