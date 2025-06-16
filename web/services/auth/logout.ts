// services/auth/logout.ts
import { createClient } from '@/lib/supabase/client';

export async function logoutUser(): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
