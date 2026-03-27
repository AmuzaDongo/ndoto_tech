import { Head } from "@inertiajs/react";
import { Plus, Users, CheckCircle, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import admin from "@/wayfinder/routes/admin";
import { columns } from "./columns";

interface Props {
  consultations: {
    data: any[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
  stats: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    total_revenue?: number;
  };
  filters?: {
    search?: string;
    status?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: admin.dashboard()},
  { title: 'Consultations', href: admin.consultations.index()},
];


export default function Index({ consultations, stats }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultations Management" />

      <div className="p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Consultations</h1>
            <p className="text-muted-foreground">
              Manage all client IT consultations, appointments, and projects
            </p>
          </div>

          <Button asChild>
            <a href="{consultationsRoute.create()}">
              <Plus className="mr-2 h-4 w-4" />
              New Consultation
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total ?? 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats?.pending ?? 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats?.in_progress ?? 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats?.completed ?? 0}</div>
            </CardContent>
          </Card>

          {stats?.total_revenue !== undefined && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Number(stats.total_revenue).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Consultations</CardTitle>
            <p className="text-sm text-muted-foreground">
              Filter, manage, and track client IT consultations
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <DataTable
              columns={columns}
              data={consultations?.data ?? []}

              totalRecords={consultations?.total ?? 0}
              currentPage={consultations?.current_page ?? 1}
              totalPages={consultations?.last_page ?? 1}
              perPage={consultations?.per_page ?? 10}

              searchKey="name"
              searchPlaceholder="Search by name, email, or title..."
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}