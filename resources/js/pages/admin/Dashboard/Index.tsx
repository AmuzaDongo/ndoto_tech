// resources/js/Pages/Dashboard.tsx
import { Head, usePage } from '@inertiajs/react';
import {
  BarChart3,
  Users,
  FolderGit2,
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

export default function Index() {
  const { stats, latest_projects, top_clients, monthly_projects, services_popularity } = usePage().props as any;

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
              <div className="text-2xl font-bold">{stats.total_projects}</div>
              <p className="text-xs text-muted-foreground">
                +{monthly_projects[Object.keys(monthly_projects).slice(-1)[0]] - monthly_projects[Object.keys(monthly_projects)[0]] || 0} projects this period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_clients}</div>
              <p className="text-xs text-muted-foreground">
                {top_clients.length} top clients
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_users}</div>
              <p className="text-xs text-muted-foreground">
                Active users in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_services}</div>
              <p className="text-xs text-muted-foreground">
                {services_popularity.length} services offered
              </p>
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
              {latest_projects.map((project: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.client?.name || 'Internal'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        project.status === "completed"
                          ? "default"
                          : project.status === "in_progress"
                          ? "secondary"
                          : project.status === "testing"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {project.status.replace('_',' ').toUpperCase()}
                    </Badge>
                    <div className="text-sm font-medium">{project.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
            <CardDescription>
              Clients with the most projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top_clients.map((client: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="font-medium">{client.name}</p>
                  <Badge variant="default">{client.projects_count} projects</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Services Tiles */}
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