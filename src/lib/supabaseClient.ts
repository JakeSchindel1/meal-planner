// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 add this line
import { ENV, isEnvValid } from '@/constants';

/**
 * Create and configure the Supabase client
 * If environment variables are not set, it will throw an error
 */
const createSupabaseClient = () => {
  if (!isEnvValid()) {
    throw new Error(
      'Missing Supabase environment variables. Please check your app.config.js file or environment variables.'
    );
  }

  // ✅ Add AsyncStorage for React Native session persistence
  const supabase = createClient(
    ENV.SUPABASE_URL,
    ENV.SUPABASE_ANON_KEY,
    {
      auth: {
        storage: AsyncStorage,             // 👈 this line solves your session issue
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );

  return supabase;
};

// Singleton instance of Supabase client
const supabase = createSupabaseClient();

export default supabase;
