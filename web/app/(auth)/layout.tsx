// app/(auth)/layout.tsx
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 text-primary-foreground relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between w-full">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8" />
            <span className="text-2xl font-bold">GuardSlot</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Stop Losing Money to No-Shows
            </h1>
            <p className="text-xl opacity-90">
              Join thousands of service providers who&apos;ve eliminated
              no-shows and grown their revenue with payment-protected bookings.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">✓</span>
                </div>
                <span>87% reduction in no-shows</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">✓</span>
                </div>
                <span>Setup in under 5 minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">✓</span>
                </div>
                <span>Automatic payment protection</span>
              </div>
            </div>
          </div>

          <div className="text-sm opacity-75">
            &quot;GuardSlot transformed our business. We went from 30% no-shows
            to less than 3%.&quot;
            <div className="mt-2 font-medium">
              — Sarah Chen, Zen Wellness Spa
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/30 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/30 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 border border-white/30 rounded-full"></div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-muted/30">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">GuardSlot</span>
            </Link>
          </div>

          {children}

          {/* Footer for mobile */}
          <div className="lg:hidden text-center mt-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
