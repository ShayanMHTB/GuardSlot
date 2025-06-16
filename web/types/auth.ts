// types/auth.ts
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  business_name: string;
  full_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser extends SupabaseUser {
  user_metadata: {
    business_name?: string;
    full_name?: string;
  } & SupabaseUser['user_metadata'];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  business_name: string;
  full_name: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
