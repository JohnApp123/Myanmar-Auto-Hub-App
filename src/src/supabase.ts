import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbmpjuoyrzwoajaqxbcg.supabase.co';
const supabaseAnonKey = 'ကူးယူထားသော_anon_key_ရှည်ကြီးကို_ဒီမှာထည့်ပါ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
