// app/(protected)/dashboard/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Calendar,
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  CalendarCheck,
  UserCheck,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data - replace with real data later
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,845',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'Revenue this month',
    },
    {
      title: 'Bookings',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      icon: CalendarCheck,
      description: 'Bookings this month',
    },
    {
      title: 'Show Rate',
      value: '92.3%',
      change: '+5.1%',
      trend: 'up',
      icon: UserCheck,
      description: 'Customer attendance',
    },
    {
      title: 'Avg. Booking Value',
      value: '$85',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      description: 'Average per booking',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 8400, bookings: 180 },
    { month: 'Feb', revenue: 9200, bookings: 195 },
    { month: 'Mar', revenue: 8800, bookings: 185 },
    { month: 'Apr', revenue: 10200, bookings: 220 },
    { month: 'May', revenue: 11500, bookings: 240 },
    { month: 'Jun', revenue: 12845, bookings: 248 },
  ];

  const bookingStatusData = [
    { name: 'Completed', value: 186, color: '#22c55e' },
    { name: 'Upcoming', value: 42, color: '#3b82f6' },
    { name: 'No-shows', value: 12, color: '#ef4444' },
    { name: 'Cancelled', value: 8, color: '#f59e0b' },
  ];

  const weeklyData = [
    { day: 'Mon', bookings: 12, revenue: 840 },
    { day: 'Tue', bookings: 18, revenue: 1260 },
    { day: 'Wed', bookings: 15, revenue: 1050 },
    { day: 'Thu', bookings: 22, revenue: 1540 },
    { day: 'Fri', bookings: 28, revenue: 1960 },
    { day: 'Sat', bookings: 35, revenue: 2450 },
    { day: 'Sun', bookings: 8, revenue: 560 },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      service: 'Hair Cut & Style',
      time: '2:00 PM',
      status: 'confirmed',
      value: 85,
    },
    {
      id: 2,
      customer: 'Michael Chen',
      service: 'Beard Trim',
      time: '3:30 PM',
      status: 'upcoming',
      value: 35,
    },
    {
      id: 3,
      customer: 'Emma Wilson',
      service: 'Color Treatment',
      time: '4:00 PM',
      status: 'confirmed',
      value: 120,
    },
    {
      id: 4,
      customer: 'David Brown',
      service: 'Consultation',
      time: '5:00 PM',
      status: 'pending',
      value: 0,
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
      case 'upcoming':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Upcoming
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      {/* Welcome Header Card */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back!
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/bookings/create">
                  <Plus className="mr-2 h-4 w-4" />
                  New Booking
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card
              key={stat.title}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendIcon
                    className={`mr-1 h-3 w-3 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  />
                  <span
                    className={
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue and booking trends
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value}` : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings',
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Status Pie Chart */}
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>
              Distribution of booking statuses this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Bookings']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col space-y-2 mt-4">
              {bookingStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Bookings Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly Activity */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>
              Bookings and revenue by day of the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value}` : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings',
                  ]}
                />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Today's Bookings</CardTitle>
            <CardDescription>Upcoming appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {booking.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.service}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {booking.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(booking.status)}
                    <span className="text-sm font-medium">
                      ${booking.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/bookings">View All Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Revenue Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,845 / $15,000</div>
            <Progress value={85.6} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              85.6% of monthly goal achieved
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Booking Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248 / 300</div>
            <Progress value={82.7} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              82.7% of booking target reached
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Show Rate Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3% / 95%</div>
            <Progress value={97.2} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              97.2% of show rate goal achieved
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
