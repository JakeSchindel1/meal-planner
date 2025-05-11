/**
 * Barrel file for service exports
 * 
 * Example usage:
 * import { api, supabaseService } from '@/services';
 */

// Export services below
// export * from './api';
// export * from './supabaseService';
export { default as supabase } from '../lib/supabaseClient';
export { API_URL } from './api'; 