// components/dashboard/AppSidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calendar,
  LayoutDashboard,
  CalendarCheck,
  Users,
  CreditCard,
  BarChart3,
  Zap,
  Key,
  Bell,
  Shield,
  HelpCircle,
  User,
  Building,
  Clock,
  Link as LinkIcon,
  Webhook,
  Palette,
  Globe,
} from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();
  const { state, open } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const navigation = [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
          isActive: pathname === '/dashboard',
        },
        {
          title: 'Analytics',
          url: '/analytics',
          icon: BarChart3,
          badge: 'Pro',
          isActive: pathname === '/analytics',
        },
      ],
    },
    {
      title: 'Bookings',
      items: [
        {
          title: 'All Bookings',
          url: '/bookings',
          icon: CalendarCheck,
          isActive: pathname === '/bookings',
        },
        {
          title: 'Appointments',
          url: '/bookings/appointments',
          icon: Clock,
          isActive: pathname === '/appointments',
        },
        {
          title: 'Customers',
          url: '/bookings/customers',
          icon: Users,
          isActive: pathname === '/customers',
        },
      ],
    },
    {
      title: 'Business',
      items: [
        {
          title: 'Payments',
          url: '/payments',
          icon: CreditCard,
          isActive: pathname === '/payments',
        },
        {
          title: 'API Keys',
          url: '/api-keys',
          icon: Key,
          isActive: pathname === '/api-keys',
        },
        {
          title: 'Booking Page',
          url: '/booking-page',
          icon: LinkIcon,
          isActive: pathname === '/booking-page',
        },
      ],
    },
    {
      title: 'Integrations',
      items: [
        {
          title: 'Calendar Sync',
          url: '/integrations/calendar',
          icon: Calendar,
          isActive: pathname === '/integrations/calendar',
        },
        {
          title: 'Webhooks',
          url: '/integrations/webhooks',
          icon: Webhook,
          badge: 'New',
          isActive: pathname === '/integrations/webhooks',
        },
        {
          title: 'Apps',
          url: '/integrations/apps',
          icon: Zap,
          isActive: pathname === '/integrations/apps',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Profile',
          url: '/settings/profile',
          icon: User,
          isActive: pathname === '/settings/profile',
        },
        {
          title: 'Business',
          url: '/settings/business',
          icon: Building,
          isActive: pathname === '/settings/business',
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
          icon: Bell,
          isActive: pathname === '/settings/notifications',
        },
        {
          title: 'Security',
          url: '/settings/security',
          icon: Shield,
          isActive: pathname === '/settings/security',
        },
        {
          title: 'Appearance',
          url: '/settings/appearance',
          icon: Palette,
          isActive: pathname === '/settings/appearance',
        },
      ],
    },
  ];

  const quickActions = [
    {
      title: 'Create Booking',
      url: '/bookings/create',
      icon: CalendarCheck,
    },
    {
      title: 'View Booking Page',
      url: '/booking-page/preview',
      icon: Globe,
    },
    {
      title: 'Help Center',
      url: '/help',
      icon: HelpCircle,
    },
  ];

  const SidebarMenuItem = ({
    item,
    isQuickAction = false,
  }: {
    item: any;
    isQuickAction?: boolean;
  }) => {
    const Icon = item.icon;
    const content = (
      <SidebarMenuButton
        asChild
        isActive={item.isActive}
        size={isQuickAction ? 'sm' : 'default'}
      >
        <Link href={item.url}>
          <Icon className="h-4 w-4" />
          {!isCollapsed && (
            <>
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Link>
      </SidebarMenuButton>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{content}</div>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {item.title}
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  // Don't render sidebar if closed on mobile
  if (isMobile && !open) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && <div className="fixed inset-0 bg-black/50 z-40" />}

      {/* Sidebar */}
      <Sidebar
        variant="floating"
        collapsible="icon"
        className={`
          ${
            isMobile
              ? 'fixed left-4 top-4 bottom-4 z-50 w-72'
              : 'fixed left-4 top-4 bottom-4 z-30'
          }
          rounded-xl border bg-card shadow-lg transition-all duration-300
        `}
      >
        {/* Header with logo */}
        <SidebarHeader className="border-b border-border/40">
          <div
            className={`flex items-center gap-2 py-3 ${
              !isCollapsed ? 'px-4' : ''
            }`}
          >
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Calendar className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-lg">GuardSlot</span>
                <span className="text-xs text-muted-foreground">v1.0.0</span>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="flex-1">
            {/* Quick Actions */}
            <SidebarGroup>
              {!isCollapsed && (
                <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {quickActions.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      item={item}
                      isQuickAction
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Main Navigation */}
            {navigation.map((group) => (
              <SidebarGroup key={group.title}>
                {!isCollapsed && (
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </ScrollArea>
        </SidebarContent>

        {/* Footer with additional info */}
        <SidebarFooter className="border-t border-border/40">
          {!isCollapsed && (
            <div className="px-4 py-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>© 2024 GuardSlot</span>
                <Badge variant="outline" className="text-xs">
                  Pro
                </Badge>
              </div>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
