import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ddjggonagtvxnthvjxtr.supabase.co";

const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  autoRefreshToken: false,
  persistSession: false,
});
const adminAuthClient = supabaseAdmin.auth.admin;

export { supabaseUrl, supabase, adminAuthClient, supabaseAdmin };
