import { createClient } from "@supabase/supabase-js";
import { env } from "./config/env.js";

const supabaseURL = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_ANON_KEY;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);

export const supabaseAdmin = createClient(supabaseURL, supabaseServiceKey || supabaseKey);
