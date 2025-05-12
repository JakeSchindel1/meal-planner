// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/services';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { API_URL } from '@/services/api';

// Extended context type
type AuthContextType = {
  authUserId: string | null;                 // ✅ NEW → true Supabase auth user ID
  user: User | null;                         // your internal user profile
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
  signup: (email: string, password: string) => Promise<{ error: AuthError | null, user: User | null }>;
};

const AuthContext = createContext<AuthContextType>({
  authUserId: null,
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ error: null }),
  logout: async () => ({ error: null }),
  signup: async () => ({ error: null, user: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUserId, setAuthUserId] = useState<string | null>(null);   // ✅ NEW
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserSession = async (userId: string) => {
    try {
      await fetch(`${API_URL}/user/updateSession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });
    } catch (error) {
      console.error('Failed to update session:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (currentSession) {
          setSession(currentSession);
          setAuthUserId(currentSession.user.id);                          // ✅ store Supabase auth user id
        }
      } catch (error) {
        console.error('Unexpected error during auth initialization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setAuthUserId(currentSession?.user.id ?? null);                  // ✅ update auth user id
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // --- LOGIN ---
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: { message: data.error || 'Login failed' } as AuthError };
      }
      setUser(data.user);                                               // internal user profile
      setSession(data.session);
      setAuthUserId(data.session?.user.id ?? null);                     // ✅ store auth user id
      if (data.user?.id) await updateUserSession(data.user.id);
      return { error: null };
    } catch (err) {
      return { error: new AuthError('Unexpected error during login.') };
    }
  };

  // --- SIGNUP ---
  const signup = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: { message: data.error || 'Signup failed' } as AuthError, user: null };
      }
      setUser(data.user);
      setSession(null);
      setAuthUserId(null);
      return { error: null, user: data.user };
    } catch (err) {
      return { error: new AuthError('Unexpected error during signup.'), user: null };
    }
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setAuthUserId(null);                                              // ✅ clear on logout
      return { error };
    } catch (err) {
      return { error: new AuthError('Unexpected error during logout.') };
    }
  };

  return (
    <AuthContext.Provider value={{
      authUserId,
      user,
      session,
      isLoading,
      isAuthenticated: !!authUserId,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
