// resources/js/Pages/Dashboard.tsx
import { Head } from '@inertiajs/react';
import {
  BarChart3,
  Users,
  FolderGit2,
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
  },
];

export default function Dashboard() {
  // Mock data — in real app, fetch from Inertia props or API
  const stats = {
    totalProjects: 42,
    activeClients: 18,
    teamMembers: 24,
    monthlyRevenue: "UGX 145M",
  };

  const recentProjects = [
    { name: "Mobile Banking App", client: "Finance Trust", status: "In Progress", progress: 65 },
    { name: "E-commerce Platform", client: "Kampala Traders", status: "Completed", progress: 100 },
    { name: "Company Website Redesign", client: "Ndoto Internal", status: "Planning", progress: 15 },
    { name: "ERP System Integration", client: "AgriTech Uganda", status: "Testing", progress: 88 },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ndoto Admin Dashboard" />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
        {/* Welcome & Quick Stats */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Admin</h1>
            <p className="text-muted-foreground">
              Here's what's happening at Ndoto Company Limited today
            </p>
          </div>
          <Button>
            New Project <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderGit2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeClients}</div>
              <p className="text-xs text-muted-foreground">+3 new this quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamMembers}</div>
              <p className="text-xs text-muted-foreground">5 developers • 4 designers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">+18% vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              Latest client work and internal initiatives at Ndoto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentProjects.map((project, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                          ? "secondary"
                          : project.status === "Testing"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {project.status}
                    </Badge>
                    <div className="text-sm font-medium">{project.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Services Tiles (optional second row) */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View project performance, billable hours, and client reports
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" /> Time Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Log hours, manage team availability, and generate invoices
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Tasks & Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage support tickets, bugs, and internal tasks
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}