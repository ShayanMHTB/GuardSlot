// hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '@/store/AuthProvider';
import { AuthContextType } from '@/types/auth';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
