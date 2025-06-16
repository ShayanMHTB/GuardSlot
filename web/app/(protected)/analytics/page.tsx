// app/(protected)/analytics/page.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ComposedChart,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Target,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months');
  const [metric, setMetric] = useState('revenue');

  // Mock data - replace with real data later
  const revenueData = [
    { month: 'Jan', revenue: 8400, bookings: 180, noShows: 22, target: 9000 },
    { month: 'Feb', revenue: 9200, bookings: 195, noShows: 18, target: 9500 },
    { month: 'Mar', revenue: 8800, bookings: 185, noShows: 25, target: 10000 },
    { month: 'Apr', revenue: 10200, bookings: 220, noShows: 15, target: 10500 },
    { month: 'May', revenue: 11500, bookings: 240, noShows: 12, target: 11000 },
    { month: 'Jun', revenue: 12845, bookings: 248, noShows: 8, target: 12000 },
  ];

  const customerSegmentData = [
    { name: 'VIP', value: 15, revenue: 4500, color: '#8b5cf6' },
    { name: 'Gold', value: 28, revenue: 3200, color: '#f59e0b' },
    { name: 'Silver', value: 45, revenue: 2800, color: '#6b7280' },
    { name: 'Bronze', value: 67, revenue: 1345, color: '#ea580c' },
  ];

  const timeSlotData = [
    { time: '9:00', bookings: 12, revenue: 840 },
    { time: '10:00', bookings: 18, revenue: 1260 },
    { time: '11:00', bookings: 22, revenue: 1540 },
    { time: '12:00', bookings: 15, revenue: 1050 },
    { time: '13:00', bookings: 8, revenue: 560 },
    { time: '14:00', bookings: 25, revenue: 1750 },
    { time: '15:00', bookings: 30, revenue: 2100 },
    { time: '16:00', bookings: 28, revenue: 1960 },
    { time: '17:00', bookings: 20, revenue: 1400 },
    { time: '18:00', bookings: 16, revenue: 1120 },
  ];

  const serviceData = [
    { service: 'Hair Cut & Style', bookings: 85, revenue: 7225, avgPrice: 85 },
    { service: 'Color Treatment', bookings: 42, revenue: 5040, avgPrice: 120 },
    { service: 'Beard Trim', bookings: 68, revenue: 2380, avgPrice: 35 },
    { service: 'Facial Treatment', bookings: 31, revenue: 2325, avgPrice: 75 },
    { service: 'Consultation', bookings: 22, revenue: 0, avgPrice: 0 },
  ];

  const kpiData = [
    {
      label: 'Revenue Growth',
      value: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs last quarter',
    },
    {
      label: 'Booking Rate',
      value: '94.3%',
      trend: 'up',
      icon: Calendar,
      description: 'monthly average',
    },
    {
      label: 'Customer Retention',
      value: '87.5%',
      trend: 'up',
      icon: Users,
      description: 'repeat customers',
    },
    {
      label: 'Avg Session Value',
      value: '$89.50',
      trend: 'down',
      icon: Target,
      description: 'per appointment',
    },
  ];

  const noShowTrends = [
    { month: 'Jan', rate: 12.2 },
    { month: 'Feb', rate: 9.2 },
    { month: 'Mar', rate: 13.5 },
    { month: 'Apr', rate: 6.8 },
    { month: 'May', rate: 5.0 },
    { month: 'Jun', rate: 3.2 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Deep insights into your business performance and growth metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={kpi.label} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendIcon
                    className={`mr-1 h-3 w-3 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  />
                  <span>{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue vs Target */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>
                  Monthly revenue compared to targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'revenue' || name === 'target'
                          ? `$${value}`
                          : value,
                        name === 'revenue'
                          ? 'Revenue'
                          : name === 'target'
                          ? 'Target'
                          : 'Bookings',
                      ]}
                    />
                    <Bar
                      dataKey="target"
                      fill="#e5e7eb"
                      name="target"
                      radius={[4, 4, 0, 0]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      stroke="#3b82f6"
                      name="revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="bookings"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* No-Show Rate Trend */}
            <Card>
              <CardHeader>
                <CardTitle>No-Show Rate Improvement</CardTitle>
                <CardDescription>
                  Monthly no-show percentage trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={noShowTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'No-show Rate']}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <TrendingDown className="inline h-4 w-4 mr-1" />
                    73.8% improvement in no-show rate since implementing
                    GuardSlot
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Peak Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Booking Hours</CardTitle>
                <CardDescription>
                  Optimal time slots for scheduling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeSlotData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="bookings"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Segments */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>
                  Revenue distribution by customer tier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="revenue"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {customerSegmentData.map((segment) => (
                    <div
                      key={segment.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span>
                          {segment.name} ({segment.value} customers)
                        </span>
                      </div>
                      <span className="font-medium">${segment.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>
                  Highest revenue generating customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Lisa Garcia',
                      revenue: 2640,
                      bookings: 22,
                      tier: 'VIP',
                    },
                    {
                      name: 'Emma Wilson',
                      revenue: 1800,
                      bookings: 15,
                      tier: 'VIP',
                    },
                    {
                      name: 'Sarah Johnson',
                      revenue: 1020,
                      bookings: 12,
                      tier: 'Gold',
                    },
                    {
                      name: 'Michael Chen',
                      revenue: 560,
                      bookings: 8,
                      tier: 'Silver',
                    },
                    {
                      name: 'David Brown',
                      revenue: 285,
                      bookings: 3,
                      tier: 'Bronze',
                    },
                  ].map((customer, index) => (
                    <div
                      key={customer.name}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {customer.bookings} bookings
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${customer.revenue}</p>
                        <Badge
                          variant="secondary"
                          className={
                            customer.tier === 'VIP'
                              ? 'bg-purple-100 text-purple-800'
                              : customer.tier === 'Gold'
                              ? 'bg-yellow-100 text-yellow-800'
                              : customer.tier === 'Silver'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-orange-100 text-orange-800'
                          }
                        >
                          {customer.tier}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>
                Revenue and booking metrics by service type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceData.map((service, index) => (
                  <div
                    key={service.service}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-medium">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {service.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">${service.revenue}</p>
                      <p className="text-sm text-muted-foreground">
                        ${service.avgPrice} avg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  AI-powered business recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Peak Performance
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Your 3-4 PM slot generates 40% more revenue. Consider
                        premium pricing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        Upsell Opportunity
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Customers who book color treatments have 85% rebooking
                        rate.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        Weekend Potential
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-300">
                        Saturday bookings are 30% below capacity. Consider
                        promotional offers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
                <CardDescription>
                  Track your business objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Revenue Target</span>
                    <span>$12,845 / $15,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '85.6%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    85.6% complete
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Customer Retention Goal</span>
                    <span>87.5% / 90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: '97.2%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    97.2% complete
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>No-Show Rate Target</span>
                    <span>3.2% / &lt;5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Goal achieved! 🎉
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
