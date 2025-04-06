
import { createClient } from '@supabase/supabase-js';

// Check for environment variables or use development defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log missing environment variables warning instead of throwing an error
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing. Using development defaults.');
  console.warn('Please provide your Supabase URL and anon key in the Supabase integration page.');
  console.warn('For now, the application will run with restricted functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to check if Supabase connection is properly configured
export const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};
