// components/dashboard/UserProfileMenu.tsx
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Building,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export function UserProfileMenu() {
  // Mock user data - replace with real user data
  const user = {
    name: 'John Doe',
    email: 'john@guardslot.com',
    avatar: '/placeholder-avatar.png',
    initials: 'JD',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 px-2 data-[state=open]:bg-muted">
          <Avatar className="h-7 w-7 mr-2">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start text-xs">
            <span className="font-medium leading-tight">{user.name}</span>
            <span className="text-muted-foreground leading-tight truncate max-w-[120px]">
              {user.email}
            </span>
          </div>
          <ChevronDown className="h-3 w-3 ml-2 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="pb-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/business">
            <Building className="mr-2 h-4 w-4" />
            <span>Business Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/billing">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/help">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
