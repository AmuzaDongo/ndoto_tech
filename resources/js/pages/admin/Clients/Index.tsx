import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import ClientFormModal from '@/components/admin/Clients/ClientFormModal';
import ClientShowModal from '@/components/admin/Clients/ClientShowModal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

import admin from '@/wayfinder/routes/admin';
import { columns } from './columns';

interface Props {
  clients: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Admin', href: admin.dashboard()},
  { title: 'Clients', href: admin.clients.index()},
];

export default function Index({ clients }: Props) {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleCreate = () => {
    setSelectedClient(null);
    setFormModalOpen(true);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setFormModalOpen(true);
  };

  const handleView = (client: any) => {
    setSelectedClient(client);
    setShowModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    router.delete(admin.clients.destroy(id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clients" />

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
            <p className="text-muted-foreground mt-1">
              Manage your clients and their associated projects
            </p>
          </div>

          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Client
          </Button>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns({
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
          data={clients}
          searchKey="name"                    // Changed from "title" to "name"
          enableColumnVisibility
        />
      </div>

      {/* Modals */}
      <ClientFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        client={selectedClient}
      />

      <ClientShowModal
        open={showModalOpen}
        onClose={() => setShowModalOpen(false)}
        client={selectedClient}
      />
    </AppLayout>
  );
}