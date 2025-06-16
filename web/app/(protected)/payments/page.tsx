// app/(protected)/payments/page.tsx
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
import { Input } from '@/components/ui/input';
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');

  // Mock data - replace with real data later
  const payments = [
    {
      id: 'PAY001',
      bookingId: 'BK001',
      customer: 'Sarah Johnson',
      amount: 85.0,
      type: 'booking',
      status: 'completed',
      method: 'card',
      date: '2024-06-23',
      time: '14:30',
      description: 'Hair Cut & Style',
      stripeId: 'pi_1234567890',
    },
    {
      id: 'PAY002',
      bookingId: 'BK004',
      customer: 'David Brown',
      amount: 25.0,
      type: 'no-show-fee',
      status: 'completed',
      method: 'card',
      date: '2024-06-23',
      time: '17:45',
      description: 'No-show penalty fee',
      stripeId: 'pi_0987654321',
    },
    {
      id: 'PAY003',
      bookingId: 'BK002',
      customer: 'Michael Chen',
      amount: 35.0,
      type: 'booking',
      status: 'authorized',
      method: 'card',
      date: '2024-06-24',
      time: '10:30',
      description: 'Beard Trim - Authorization',
      stripeId: 'pi_1122334455',
    },
    {
      id: 'PAY004',
      bookingId: 'BK003',
      customer: 'Emma Wilson',
      amount: 120.0,
      type: 'booking',
      status: 'pending',
      method: 'card',
      date: '2024-06-24',
      time: '14:00',
      description: 'Color Treatment',
      stripeId: 'pi_5566778899',
    },
    {
      id: 'PAY005',
      bookingId: 'BK005',
      customer: 'Lisa Garcia',
      amount: 75.0,
      type: 'booking',
      status: 'failed',
      method: 'card',
      date: '2024-06-24',
      time: '17:30',
      description: 'Facial Treatment - Payment Failed',
      stripeId: 'pi_9988776655',
    },
  ];

  const paymentData = [
    { month: 'Jan', revenue: 8400, fees: 420 },
    { month: 'Feb', revenue: 9200, fees: 380 },
    { month: 'Mar', revenue: 8800, fees: 520 },
    { month: 'Apr', revenue: 10200, fees: 290 },
    { month: 'May', revenue: 11500, fees: 180 },
    { month: 'Jun', revenue: 12845, fees: 95 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case 'authorized':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Authorized
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Failed
          </Badge>
        );
      case 'refunded':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'authorized':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'no-show-fee':
        return <ArrowDownLeft className="h-4 w-4 text-orange-600" />;
      case 'refund':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'pending' || p.status === 'authorized')
    .reduce((sum, p) => sum + p.amount, 0);
  const noShowFees = payments
    .filter((p) => p.type === 'no-show-fee' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const failedPayments = payments.filter((p) => p.status === 'failed').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Track revenue, no-show fees, and payment authorizations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Authorized payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No-Show Fees</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${noShowFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Revenue protection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Payments
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedPayments}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>
                View and manage all payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
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
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="authorized">Authorized</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="booking">Bookings</SelectItem>
                      <SelectItem value="no-show-fee">No-show Fees</SelectItem>
                      <SelectItem value="refund">Refunds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Transactions Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{payment.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {payment.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{payment.customer}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(payment.type)}
                          <span className="capitalize">
                            {payment.type.replace('-', ' ')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payment.status)}
                          {getStatusBadge(payment.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>
                            {new Date(payment.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {payment.time}
                          </div>
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
                            {payment.status === 'failed' && (
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry Payment
                              </DropdownMenuItem>
                            )}
                            {payment.status === 'completed' && (
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Refund Payment
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredPayments.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No transactions found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue & Fees Trend</CardTitle>
                <CardDescription>
                  Monthly revenue vs no-show fees collected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}`,
                        name === 'revenue' ? 'Revenue' : 'No-show Fees',
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#22c55e" name="revenue" />
                    <Bar dataKey="fees" fill="#f97316" name="fees" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Distribution of payment methods used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit/Debit Cards</span>
                  </div>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Digital Wallets</span>
                  </div>
                  <span className="font-medium">4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Bank Transfer</span>
                  </div>
                  <span className="font-medium">1%</span>
                </div>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Success Rate</CardTitle>
                <CardDescription>Transaction success metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span>96.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: '96.8%' }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Authorization Rate</span>
                    <span>98.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '98.2%' }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>No-show Fee Collection</span>
                    <span>87.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: '87.5%' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure your payment processing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Stripe Integration</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Connected to Stripe</p>
                    <p className="text-sm text-muted-foreground">
                      Account: acct_1234567890
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">No-show Fee Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Fee Amount
                    </label>
                    <Input placeholder="$25.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Fee Collection Timing
                    </label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1hour">
                          1 hour after no-show
                        </SelectItem>
                        <SelectItem value="24hours">
                          24 hours after no-show
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
