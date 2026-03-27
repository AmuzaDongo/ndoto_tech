import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import ProjectFormModal from '@/components/admin/Projects/ProjectFormModal';
import ProjectShowModal from '@/components/admin/Projects/ProjectShowModal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import admin from '@/wayfinder/routes/admin';
import { columns } from './columns';

interface Props {
  projects: {
    data: any[];
    links: any;
    meta: any;
  };
  clients: any[];
  services: any[];
  filters?: {
    search?: string;
    status?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Admin', href: admin.dashboard()},
  { title: 'Projects', href: admin.projects.index()},
];

export default function Index({ projects, clients, services }: Props) {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleCreate = () => {
    setSelectedProject(null);
    setFormModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setFormModalOpen(true);
  };

  const handleView = (project: any) => {
    setSelectedProject(project);
    setShowModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    router.delete(admin.projects.destroy(id), {
      onSuccess: () => {
        // Optional: show toast
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage all client projects and track their progress
            </p>
          </div>

          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns({
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
          data={projects.data}
          searchKey="title"
          enableRowSelection
          enableColumnVisibility
        />
      </div>

      {/* Modals */}
      <ProjectFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        project={selectedProject}
        clients={clients}
        services={services}
      />

      <ProjectShowModal
        open={showModalOpen}
        onClose={() => setShowModalOpen(false)}
        project={selectedProject}
      />
    </AppLayout>
  );
}