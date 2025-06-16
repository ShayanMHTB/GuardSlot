// components/dashboard/NotificationButton.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bell,
  Calendar,
  CreditCard,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

export function NotificationButton() {
  const [unreadCount, setUnreadCount] = useState(3);

  // Mock notifications - replace with real data
  const notifications = [
    {
      id: 1,
      title: 'New booking received',
      description: 'Sarah Johnson booked Hair Cut & Style for tomorrow 2:00 PM',
      time: '2 minutes ago',
      icon: Calendar,
      type: 'booking',
      unread: true,
    },
    {
      id: 2,
      title: 'Payment authorized',
      description: "Michael Chen's payment of $35 has been authorized",
      time: '15 minutes ago',
      icon: CreditCard,
      type: 'payment',
      unread: true,
    },
    {
      id: 3,
      title: 'Customer no-show',
      description: 'David Brown missed his appointment. No-show fee collected.',
      time: '1 hour ago',
      icon: AlertTriangle,
      type: 'no-show',
      unread: true,
    },
    {
      id: 4,
      title: 'New customer registered',
      description: 'Emma Wilson created an account and is browsing services',
      time: '2 hours ago',
      icon: Users,
      type: 'customer',
      unread: false,
    },
    {
      id: 5,
      title: 'Appointment completed',
      description: "Lisa Garcia's facial treatment completed successfully",
      time: '3 hours ago',
      icon: CheckCircle,
      type: 'completed',
      unread: false,
    },
  ];

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'payment':
        return <CreditCard className="h-4 w-4 text-green-600" />;
      case 'no-show':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'customer':
        return <Users className="h-4 w-4 text-purple-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <DropdownMenuItem className="flex items-start space-x-3 p-3 cursor-pointer">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <p
                      className={`text-sm font-medium leading-tight ${
                        notification.unread
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {notification.title}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {notification.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </DropdownMenuItem>
              {index < notifications.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center py-2">
          <Button variant="ghost" size="sm" className="w-full">
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
