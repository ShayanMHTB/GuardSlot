// app/(protected)/api-keys/page.tsx
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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  MoreHorizontal,
  Trash2,
  Edit,
  Calendar,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Code,
  BookOpen,
} from 'lucide-react';

export default function ApiKeysPage() {
  const [showKey, setShowKey] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mock data - replace with real data later
  const apiKeys = [
    {
      id: 'key_1',
      name: 'Main Booking API',
      key: 'sk_live_123abc...xyz789',
      created: '2024-06-01',
      lastUsed: '2024-06-23',
      status: 'active',
      permissions: ['bookings:read', 'bookings:write', 'customers:read'],
      usageCount: 1247,
    },
    {
      id: 'key_2',
      name: 'Website Integration',
      key: 'sk_live_456def...abc123',
      created: '2024-05-15',
      lastUsed: '2024-06-23',
      status: 'active',
      permissions: ['bookings:write', 'customers:write'],
      usageCount: 892,
    },
    {
      id: 'key_3',
      name: 'Analytics Dashboard',
      key: 'sk_live_789ghi...def456',
      created: '2024-04-20',
      lastUsed: '2024-06-20',
      status: 'active',
      permissions: ['analytics:read', 'bookings:read'],
      usageCount: 445,
    },
    {
      id: 'key_4',
      name: 'Test Integration',
      key: 'sk_test_xyz789...ghi123',
      created: '2024-03-10',
      lastUsed: '2024-05-15',
      status: 'inactive',
      permissions: ['bookings:read'],
      usageCount: 67,
    },
  ];

  const handleCopyKey = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => {
    return (
      key.substring(0, 12) + '•'.repeat(20) + key.substring(key.length - 8)
    );
  };

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
      case 'revoked':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateKey = () => {
    // TODO: Implement API key creation
    console.log('Creating API key:', newKeyName);
    setIsCreateDialogOpen(false);
    setNewKeyName('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">API Keys</h2>
          <p className="text-muted-foreground">
            Manage your API keys for integrating GuardSlot with your
            applications
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Generate a new API key for integrating with external
                applications.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">API Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Website Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                Create Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Security Alert */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Keep your API keys secure! Never share them publicly or commit them to
          version control. Use environment variables in your applications.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiKeys.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {apiKeys.filter((key) => key.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {apiKeys
                .reduce((sum, key) => sum + key.usageCount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Manage and monitor your API key usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{apiKey.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Created {new Date(apiKey.created).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {showKey === apiKey.id
                          ? apiKey.key
                          : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowKey(showKey === apiKey.id ? null : apiKey.id)
                        }
                      >
                        {showKey === apiKey.id ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                      >
                        {copiedKey === apiKey.id ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.slice(0, 2).map((permission) => (
                        <Badge
                          key={permission}
                          variant="outline"
                          className="text-xs"
                        >
                          {permission}
                        </Badge>
                      ))}
                      {apiKey.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{apiKey.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {apiKey.usageCount.toLocaleString()} requests
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(apiKey.lastUsed).toLocaleDateString()}
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
                        <DropdownMenuItem
                          onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Permissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Revoke Key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Documentation Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              API Documentation
            </CardTitle>
            <CardDescription>
              Learn how to integrate GuardSlot API into your applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href="/docs/api" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Getting Started Guide
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href="/docs/api/reference" target="_blank">
                  <Code className="mr-2 h-4 w-4" />
                  API Reference
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href="/docs/webhooks" target="_blank">
                  <Globe className="mr-2 h-4 w-4" />
                  Webhooks Guide
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Usage Examples</CardTitle>
            <CardDescription>
              Common API endpoints and usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Create a booking</p>
                <code className="text-xs text-muted-foreground">
                  POST /api/v1/bookings
                </code>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Get customer list</p>
                <code className="text-xs text-muted-foreground">
                  GET /api/v1/customers
                </code>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">
                  Update booking status
                </p>
                <code className="text-xs text-muted-foreground">
                  PATCH /api/v1/bookings/:id
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security Best Practices
          </CardTitle>
          <CardDescription>
            Keep your API keys and integrations secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Use Environment Variables
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Store API keys in environment variables, never in code
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Rotate Keys Regularly</p>
                  <p className="text-xs text-muted-foreground">
                    Create new keys and revoke old ones periodically
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Use HTTPS Only</p>
                  <p className="text-xs text-muted-foreground">
                    Always make API requests over secure HTTPS connections
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Monitor Usage</p>
                  <p className="text-xs text-muted-foreground">
                    Watch for unusual activity in your API key usage
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Limit Permissions</p>
                  <p className="text-xs text-muted-foreground">
                    Grant only the minimum permissions needed
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Revoke Unused Keys</p>
                  <p className="text-xs text-muted-foreground">
                    Remove API keys that are no longer needed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
