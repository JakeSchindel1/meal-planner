/**
 * API configuration settings
 * Dynamically sets the API URL based on environment
 */

const isDev = process.env.NODE_ENV === 'development';

export const API_URL = isDev 
  ? 'http://localhost:4000' 
  : 'https://your-production-backend-url.com'; 