// components/dashboard/DashboardHeader.tsx
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { DashboardBreadcrumb } from './DashboardBreadcrumb';
import { NotificationButton } from './NotificationButton';
import { ThemeToggler } from '../common/ThemeToggler';
import { UserProfileMenu } from './UserProfileMenu';

export function DashboardHeader() {
  return (
    <header className="mx-6 mt-6 rounded-xl border bg-card shadow-sm">
      <div className="flex h-16 items-center px-6">
        {/* Left side: Sidebar trigger + Breadcrumb */}
        <div className="flex items-center space-x-4 flex-1">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="h-4 data-[orientation=vertical]:h-4"
          />
          <DashboardBreadcrumb />
        </div>

        {/* Right side: Notifications + Theme + Profile */}
        <div className="flex items-center space-x-2">
          <NotificationButton />
          <ThemeToggler />
          <Separator
            orientation="vertical"
            className="h-4 data-[orientation=vertical]:h-4"
          />
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
}
