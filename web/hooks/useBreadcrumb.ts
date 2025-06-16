// hooks/useBreadcrumb.ts
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

// Route mapping for better breadcrumb labels
const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  bookings: 'Bookings',
  appointments: 'Appointments',
  customers: 'Customers',
  payments: 'Payments',
  'api-keys': 'API Keys',
  'booking-page': 'Booking Page',
  integrations: 'Integrations',
  calendar: 'Calendar Sync',
  webhooks: 'Webhooks',
  apps: 'Apps',
  settings: 'Settings',
  profile: 'Profile',
  business: 'Business',
  notifications: 'Notifications',
  security: 'Security',
  appearance: 'Appearance',
  create: 'Create',
  edit: 'Edit',
};

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with Dashboard as root
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/dashboard',
      isActive: pathname === '/dashboard',
    });

    // Skip if we're already on dashboard root
    if (pathname === '/dashboard') {
      return breadcrumbs;
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Get label from mapping or format the segment
      const label =
        routeLabels[segment] ||
        segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

      breadcrumbs.push({
        label,
        href: currentPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  }, [pathname]);
}
