// app/(protected)/customers/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  MoreHorizontal,
  Plus,
  Download,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  MessageSquare,
  Phone,
  UserPlus,
  Star,
  StarOff,
} from 'lucide-react';
import Link from 'next/link';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock data - replace with real data later
  const customers = [
    {
      id: 'CUST001',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567',
      avatar: '/placeholder-avatar.png',
      status: 'active',
      totalBookings: 12,
      totalSpent: 1020,
      lastBooking: '2024-06-20',
      nextBooking: '2024-06-24',
      joinDate: '2024-01-15',
      rating: 5,
      notes: 'Prefers morning appointments',
      tags: ['VIP', 'Regular'],
    },
    {
      id: 'CUST002',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 (555) 234-5678',
      avatar: '/placeholder-avatar.png',
      status: 'active',
      totalBookings: 8,
      totalSpent: 560,
      lastBooking: '2024-06-18',
      nextBooking: '2024-06-24',
      joinDate: '2024-02-20',
      rating: 4,
      notes: '',
      tags: ['Regular'],
    },
    {
      id: 'CUST003',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+1 (555) 345-6789',
      avatar: '/placeholder-avatar.png',
      status: 'active',
      totalBookings: 15,
      totalSpent: 1800,
      lastBooking: '2024-06-21',
      nextBooking: '2024-06-24',
      joinDate: '2023-12-10',
      rating: 5,
      notes: 'Allergic to ammonia',
      tags: ['VIP', 'Special Needs'],
    },
    {
      id: 'CUST004',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1 (555) 456-7890',
      avatar: '/placeholder-avatar.png',
      status: 'inactive',
      totalBookings: 3,
      totalSpent: 85,
      lastBooking: '2024-05-15',
      nextBooking: null,
      joinDate: '2024-05-01',
      rating: 3,
      notes: 'Had a no-show',
      tags: ['New'],
    },
    {
      id: 'CUST005',
      name: 'Lisa Garcia',
      email: 'lisa@example.com',
      phone: '+1 (555) 567-8901',
      avatar: '/placeholder-avatar.png',
      status: 'active',
      totalBookings: 22,
      totalSpent: 2640,
      lastBooking: '2024-06-23',
      nextBooking: '2024-06-30',
      joinDate: '2023-08-05',
      rating: 5,
      notes: 'Owns a small business',
      tags: ['VIP', 'Long-term'],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
      case 'blocked':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Blocked
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 2000)
      return { tier: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent >= 1000)
      return { tier: 'Gold', color: 'bg-yellow-100 text-yellow-800' };
    if (totalSpent >= 500)
      return { tier: 'Silver', color: 'bg-gray-100 text-gray-800' };
    return { tier: 'Bronze', color: 'bg-orange-100 text-orange-800' };
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      ) : (
        <StarOff key={i} className="h-3 w-3 text-gray-300" />
      ),
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'spent':
        return b.totalSpent - a.totalSpent;
      case 'bookings':
        return b.totalBookings - a.totalBookings;
      case 'joinDate':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default:
        return 0;
    }
  });

  const stats = [
    {
      label: 'Total Customers',
      value: customers.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Active Customers',
      value: customers.filter((c) => c.status === 'active').length,
      icon: UserPlus,
      color: 'text-green-600',
    },
    {
      label: 'Total Bookings',
      value: customers.reduce((sum, c) => sum + c.totalBookings, 0),
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      label: 'Total Revenue',
      value: `$${customers
        .reduce((sum, c) => sum + c.totalSpent, 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships and track their booking history
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/customers/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            View and manage your customer relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="spent">Total Spent</SelectItem>
                  <SelectItem value="bookings">Bookings</SelectItem>
                  <SelectItem value="joinDate">Join Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customers Table */}
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Last Booking</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCustomers.map((customer) => {
                  const tier = getCustomerTier(customer.totalSpent);
                  return (
                    <TableRow key={customer.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={customer.avatar}
                              alt={customer.name}
                            />
                            <AvatarFallback>
                              {customer.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {customer.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{customer.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>
                        <Badge className={tier.color}>{tier.tier}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {customer.totalBookings}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          ${customer.totalSpent}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {renderStars(customer.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({customer.rating})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(customer.lastBooking).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Book Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Call Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {sortedCustomers.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  No customers found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your filters or search terms.'
                    : 'Get started by adding your first customer.'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Button asChild className="mt-4">
                    <Link href="/customers/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Customer
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
