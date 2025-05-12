/**
 * Services barrel file for easy imports
 * 
 * Usage:
 * import { api, supabaseService } from '@/services';
 */

// Export services
// export * from './api';
// export * from './supabaseService';
export { default as supabase } from '@/lib/supabaseClient';
export { API_URL } from './api'; 