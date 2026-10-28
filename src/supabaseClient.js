import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqkritapgbpezjnheuix.supabase.co';
const supabaseAnonKey = 'sb_publishable_cigOU2-670TXpGMi6A1TTA_t_ySvuEr';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);