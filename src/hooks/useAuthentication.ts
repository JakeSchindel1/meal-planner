import { useState } from 'react';
import { useAuth } from '../context';
import { AuthError } from '@supabase/supabase-js';

/**
 * Custom hook for authentication operations with loading and error states
 * Makes it easier to use authentication in components
 */
export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await auth.login(email, password);
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      return true;
    } catch (err) {
      setError('An unexpected error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await auth.signup(email, password);
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      return true;
    } catch (err) {
      setError('An unexpected error occurred during signup');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await auth.logout();
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      return true;
    } catch (err) {
      setError('An unexpected error occurred during logout');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: isLoading || auth.isLoading,
    error,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuthentication; 