// services/auth/register.ts
import { createClient } from '@/lib/supabase/client';
import { RegisterCredentials, User } from '@/types/auth';

export async function registerUser(
  credentials: RegisterCredentials,
): Promise<User> {
  const supabase = createClient();

  // Create auth user with Supabase
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        business_name: credentials.business_name,
        full_name: credentials.full_name,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('Registration failed');
  }

  // Create user profile in our users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: credentials.email,
      business_name: credentials.business_name,
      full_name: credentials.full_name,
    })
    .select()
    .single();

  if (userError) {
    // If user profile creation fails, we should clean up the auth user
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw new Error('Failed to create user profile');
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
