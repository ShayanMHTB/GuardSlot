// app/(protected)/appointments/page.tsx
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  MoreHorizontal,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with real data later
  const appointments = [
    {
      id: 'APT001',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
        avatar: '/placeholder-avatar.png',
      },
      service: 'Hair Cut & Style',
      date: '2024-06-24',
      time: '09:00',
      duration: 90,
      status: 'confirmed',
      value: 85,
      location: 'Studio A',
      notes: 'First time customer, prefers natural look',
    },
    {
      id: 'APT002',
      customer: {
        name: 'Michael Chen',
        email: 'michael@example.com',
        phone: '+1 (555) 234-5678',
        avatar: '/placeholder-avatar.png',
      },
      service: 'Beard Trim',
      date: '2024-06-24',
      time: '10:30',
      duration: 30,
      status: 'confirmed',
      value: 35,
      location: 'Studio B',
      notes: '',
    },
    {
      id: 'APT003',
      customer: {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        phone: '+1 (555) 345-6789',
        avatar: '/placeholder-avatar.png',
      },
      service: 'Color Treatment',
      date: '2024-06-24',
      time: '14:00',
      duration: 120,
      status: 'in-progress',
      value: 120,
      location: 'Studio A',
      notes: 'Allergic to ammonia - use alternative products',
    },
    {
      id: 'APT004',
      customer: {
        name: 'David Brown',
        email: 'david@example.com',
        phone: '+1 (555) 456-7890',
        avatar: '/placeholder-avatar.png',
      },
      service: 'Consultation',
      date: '2024-06-24',
      time: '16:00',
      duration: 30,
      status: 'upcoming',
      value: 0,
      location: 'Studio C',
      notes: 'Interested in wedding package',
    },
    {
      id: 'APT005',
      customer: {
        name: 'Lisa Garcia',
        email: 'lisa@example.com',
        phone: '+1 (555) 567-8901',
        avatar: '/placeholder-avatar.png',
      },
      service: 'Facial Treatment',
      date: '2024-06-24',
      time: '17:30',
      duration: 60,
      status: 'upcoming',
      value: 75,
      location: 'Studio B',
      notes: 'Regular customer - knows preferences',
    },
  ];

  const todayAppointments = appointments.filter(
    (apt) => apt.date === '2024-06-24',
  );
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'upcoming',
  );
  const inProgressAppointments = appointments.filter(
    (apt) => apt.status === 'in-progress',
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Confirmed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            In Progress
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Upcoming
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
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
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-green-600" />;
      case 'upcoming':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={appointment.customer.avatar}
                alt={appointment.customer.name}
              />
              <AvatarFallback>
                {appointment.customer.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.customer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {appointment.service}
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {appointment.time} ({appointment.duration} min)
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {appointment.location}
                </div>
                {appointment.value > 0 && (
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-3 w-3" />${appointment.value}
                  </div>
                )}
              </div>
              {appointment.notes && (
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  📝 {appointment.notes}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {getStatusIcon(appointment.status)}
              {getStatusBadge(appointment.status)}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Appointment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Customer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {appointment.status === 'upcoming' && (
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Start Appointment
                  </DropdownMenuItem>
                )}
                {appointment.status === 'in-progress' && (
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Appointment
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">
            View and manage today&apos;s schedule and upcoming appointments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/bookings/create">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Total</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              appointments scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inProgressAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">remaining today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${todayAppointments.reduce((sum, apt) => sum + apt.value, 0)}
            </div>
            <p className="text-xs text-muted-foreground">expected today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {todayAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      No appointments today
                    </h3>
                    <p className="text-muted-foreground">
                      You have a free day! Enjoy some well-deserved rest.
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/bookings/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Appointment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      No upcoming appointments
                    </h3>
                    <p className="text-muted-foreground">
                      All caught up! Check back later for new bookings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressAppointments.length > 0 ? (
            <div className="space-y-4">
              {inProgressAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <User className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      No appointments in progress
                    </h3>
                    <p className="text-muted-foreground">
                      Start your next appointment when the customer arrives.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
