import { createClient } from "@supabase/supabase-js";
import {
  fetchWithTimeout,
  ServiceUnavailableError,
} from "./src/services/serviceAvailability";
const supabaseUrl = "https://ddjggonagtvxnthvjxtr.supabase.co";

// Initialize on use: missing optional configuration must not prevent the app from mounting.
function optionalClient(key, options = {}) {
  let client;
  return new Proxy(
    {},
    {
      get(_, property) {
        if (!key?.trim()) throw new ServiceUnavailableError();
        if (!client) {
          try {
            client = createClient(supabaseUrl, key, {
              ...options,
              global: { fetch: fetchWithTimeout },
            });
          } catch {
            throw new ServiceUnavailableError();
          }
        }
        const value = Reflect.get(client, property, client);
        return typeof value === "function" ? value.bind(client) : value;
      },
    },
  );
}

const supabase = optionalClient(import.meta.env.VITE_SUPABASE_API_KEY);
const supabaseAdmin = optionalClient(
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
);
const adminAuthClient = new Proxy(
  {},
  {
    get(_, property) {
      const admin = supabaseAdmin.auth.admin;
      const value = admin[property];
      return typeof value === "function" ? value.bind(admin) : value;
    },
  },
);

export { supabaseUrl, supabase, adminAuthClient, supabaseAdmin };
