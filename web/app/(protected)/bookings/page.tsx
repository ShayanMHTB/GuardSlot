// app/(protected)/bookings/page.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Calendar,
  Clock,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock data - replace with real data later
  const bookings = [
    {
      id: 'BK001',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
      },
      service: 'Hair Cut & Style',
      date: '2024-06-24',
      time: '2:00 PM',
      duration: 90,
      status: 'confirmed',
      value: 85,
      noShowFee: 0,
      notes: 'First time customer',
      createdAt: '2024-06-20',
    },
    {
      id: 'BK002',
      customer: {
        name: 'Michael Chen',
        email: 'michael@example.com',
        phone: '+1 (555) 234-5678',
      },
      service: 'Beard Trim',
      date: '2024-06-24',
      time: '3:30 PM',
      duration: 30,
      status: 'pending',
      value: 35,
      noShowFee: 0,
      notes: '',
      createdAt: '2024-06-22',
    },
    {
      id: 'BK003',
      customer: {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        phone: '+1 (555) 345-6789',
      },
      service: 'Color Treatment',
      date: '2024-06-24',
      time: '4:00 PM',
      duration: 120,
      status: 'confirmed',
      value: 120,
      noShowFee: 0,
      notes: 'Allergic to ammonia',
      createdAt: '2024-06-21',
    },
    {
      id: 'BK004',
      customer: {
        name: 'David Brown',
        email: 'david@example.com',
        phone: '+1 (555) 456-7890',
      },
      service: 'Consultation',
      date: '2024-06-23',
      time: '5:00 PM',
      duration: 30,
      status: 'no-show',
      value: 0,
      noShowFee: 25,
      notes: '',
      createdAt: '2024-06-20',
    },
    {
      id: 'BK005',
      customer: {
        name: 'Lisa Garcia',
        email: 'lisa@example.com',
        phone: '+1 (555) 567-8901',
      },
      service: 'Facial Treatment',
      date: '2024-06-23',
      time: '1:00 PM',
      duration: 60,
      status: 'completed',
      value: 75,
      noShowFee: 0,
      notes: 'Regular customer',
      createdAt: '2024-06-19',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Completed
          </Badge>
        );
      case 'no-show':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            No-show
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'no-show':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || booking.status === statusFilter;

    // Simple date filtering - in real app, this would be more sophisticated
    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'today' && booking.date === '2024-06-24') ||
      (dateFilter === 'week' &&
        new Date(booking.date) >= new Date('2024-06-23'));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = [
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      label: 'Confirmed',
      value: bookings.filter((b) => b.status === 'confirmed').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      label: 'No-shows',
      value: bookings.filter((b) => b.status === 'no-show').length,
      icon: XCircle,
      color: 'text-red-600',
    },
    {
      label: 'Revenue',
      value: `${bookings.reduce((sum, b) => sum + b.value + b.noShowFee, 0)}`,
      icon: DollarSign,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          <p className="text-muted-foreground">
            Manage all your appointments and customer bookings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/bookings/create">
              <Plus className="mr-2 h-4 w-4" />
              New Booking
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
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>View and manage your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no-show">No-show</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {booking.customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3 w-3 text-muted-foreground" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-3 w-3" />
                          {booking.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.duration} min</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        {getStatusBadge(booking.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">${booking.value}</div>
                        {booking.noShowFee > 0 && (
                          <div className="text-sm text-red-600">
                            +${booking.noShowFee} fee
                          </div>
                        )}
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Booking
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  No bookings found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
                    ? 'Try adjusting your filters or search terms.'
                    : 'Get started by creating your first booking.'}
                </p>
                {!searchQuery &&
                  statusFilter === 'all' &&
                  dateFilter === 'all' && (
                    <Button asChild className="mt-4">
                      <Link href="/bookings/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Booking
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
