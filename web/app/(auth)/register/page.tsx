// app/(auth)/register/page.tsx

import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | GuardSlot',
  description:
    "Join thousands of service providers who've eliminated no-shows and grown their revenue with GuardSlot.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
