// services/auth/login.ts
import { createClient } from '@/lib/supabase/client';
import { LoginCredentials, User } from '@/types/auth';

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  const supabase = createClient();

  // Authenticate with Supabase
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('Login failed');
  }

  // Get user profile from our users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (userError) {
    throw new Error('Failed to fetch user profile');
  }

  return {
    id: userData.id,
    email: userData.email,
    business_name: userData.business_name,
    full_name: userData.full_name,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  };
}
