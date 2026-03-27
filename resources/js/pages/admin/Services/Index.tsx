import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import ServiceFormModal from '@/components/admin/Services/ServiceFormModal';
import ServiceShowModal from '@/components/admin/Services/ServiceShowModal';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

import admin from '@/wayfinder/routes/admin';
import { columns } from './columns';

interface Props {
  services: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Admin', href: admin.index() },
  { title: 'Services', href: admin.services.index() },
];

export default function Index({ services }: Props) {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleCreate = () => {
    setSelectedService(null);
    setFormModalOpen(true);
  };

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setFormModalOpen(true);
  };

  const handleView = (service: any) => {
    setSelectedService(service);
    setShowModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    router.delete(admin.services.destroy(id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Services" />

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Services</h1>
            <p className="text-muted-foreground mt-1">
              Manage your service offerings and track associated projects
            </p>
          </div>

          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns({
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
          data={services}
          searchKey="title"
          enableColumnVisibility
        />
      </div>

      {/* Modals */}
      <ServiceFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        service={selectedService}
      />

      <ServiceShowModal
        open={showModalOpen}
        onClose={() => setShowModalOpen(false)}
        service={selectedService}
      />
    </AppLayout>
  );
}