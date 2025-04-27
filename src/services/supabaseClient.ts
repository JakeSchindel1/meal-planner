import { createClient } from '@supabase/supabase-js';
import { ENV, isEnvValid } from '../constants';

/**
 * Create and configure the Supabase client
 * If environment variables are not set, it will throw an error
 */
const createSupabaseClient = () => {
  // First check if the environment variables are properly set
  if (!isEnvValid()) {
    throw new Error(
      'Missing Supabase environment variables. Please check your app.config.js file or environment variables.'
    );
  }

  // Create the Supabase client with the provided environment variables
  const supabase = createClient(
    ENV.SUPABASE_URL,
    ENV.SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );

  return supabase;
};

// Create a singleton instance of the Supabase client
const supabase = createSupabaseClient();

export default supabase; 