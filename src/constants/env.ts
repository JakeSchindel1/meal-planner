import Constants from 'expo-constants';

/**
 * Environment variables from app.config.js
 * These values are loaded at build time from app.config.js or environment variables
 */
const ENV = {
  // Supabase configuration
  SUPABASE_URL: Constants.expoConfig?.extra?.SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY: Constants.expoConfig?.extra?.SUPABASE_ANON_KEY ?? '',
};

/**
 * Checks if all required environment variables are set
 * @returns true if all environment variables are configured
 */
export const isEnvValid = (): boolean => {
  // Check if any of the required environmental variables are missing or empty
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missingVars = requiredVars.filter(key => !ENV[key as keyof typeof ENV]);
  
  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
};

export default ENV; 