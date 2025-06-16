// app/(protected)/layout.tsx
'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useSidebarWidth } from '@/hooks/useSidebarWidth';

function ProtectedLayoutInner({ children }: { children: React.ReactNode }) {
  const { contentMargin, isMobile } = useSidebarWidth();

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Floating sidebar - positioned absolutely on desktop, overlay on mobile */}
      <AppSidebar />

      {/* Main content area with calculated margin */}
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isMobile ? '0px' : contentMargin,
        }}
      >
        {/* Floating header card */}
        <DashboardHeader />

        {/* Content area with floating cards */}
        <main className="flex flex-1 flex-col gap-6 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '18rem',
        } as React.CSSProperties
      }
    >
      <ProtectedLayoutInner>{children}</ProtectedLayoutInner>
    </SidebarProvider>
  );
}
