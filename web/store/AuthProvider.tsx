// store/AuthProvider.tsx
'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { loginUser } from '@/services/auth/login';
import { registerUser } from '@/services/auth/register';
import { logoutUser } from '@/services/auth/logout';
import {
  AuthContextType,
  User,
  LoginCredentials,
  RegisterCredentials,
} from '@/types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Fetch user profile
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userError) {
            console.error('Error fetching user profile:', userError);
            await supabase.auth.signOut();
          } else {
            setUser({
              id: userData.id,
              email: userData.email,
              business_name: userData.business_name,
              full_name: userData.full_name,
              created_at: userData.created_at,
              updated_at: userData.updated_at,
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        router.push('/login');
      } else if (event === 'SIGNED_IN' && session.user) {
        // Fetch user profile when signed in
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!userError) {
          setUser({
            id: userData.id,
            email: userData.email,
            business_name: userData.business_name,
            full_name: userData.full_name,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await loginUser(credentials);
      setUser(userData);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await registerUser(credentials);
      setUser(userData);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await logoutUser();
      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
