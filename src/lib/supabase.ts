import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase credentials in environment variables.');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export default supabase;
