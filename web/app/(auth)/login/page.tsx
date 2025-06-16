// app/(auth)/login/page.tsx
import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | GuardSlot',
  description:
    'Sign in to your GuardSlot account to manage your bookings and eliminate no-shows.',
};

export default function LoginPage() {
  return <LoginForm />;
}
