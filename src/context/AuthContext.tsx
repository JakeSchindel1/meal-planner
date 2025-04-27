import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services';
import { User, Session, AuthError } from '@supabase/supabase-js';

// Define the context state type
type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
  signup: (email: string, password: string) => Promise<{ error: AuthError | null, user: User | null }>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ error: null }),
  logout: async () => ({ error: null }),
  signup: async () => ({ error: null, user: null }),
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state with current session if it exists
  useEffect(() => {
    // Check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Get current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error.message);
        }
        
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
        }
      } catch (error) {
        console.error('Unexpected error during auth initialization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { error: { message: data.error || 'Login failed' } as AuthError };
      }
  
      setUser(data.user);
      setSession(data.session);
  
      return { error: null };
    } catch (err) {
      console.error('Unexpected error during login:', err);
      return {
        error: new AuthError('An unexpected error occurred during login.'),
      };
    }
  };
  

  // Sign up with email and password
  const signup = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { error: { message: data.error || 'Signup failed' } as AuthError, user: null };
      }
  
      setUser(data.user);
      setSession(null); // No session yet until email confirmed usually
  
      return { error: null, user: data.user };
    } catch (err) {
      console.error('Unexpected error during signup:', err);
      return {
        error: new AuthError('An unexpected error occurred during signup.'),
        user: null,
      };
    }
  };
  

  // Log out
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err) {
      console.error('Unexpected error during logout:', err);
      return { 
        error: new AuthError('An unexpected error occurred during logout.') 
      };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 