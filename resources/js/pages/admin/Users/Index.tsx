import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import UserFormModal from '@/components/admin/Users/UserFormModal';
import UserShowModal from '@/components/admin/Users/UserShowModal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import admin from '@/wayfinder/routes/admin';
import { columns } from './columns';


const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Admin', href: admin.dashboard()},
  { title: 'Users', href: admin.users.index()},
];

export default function Index({ users }: { users: { data: User[] } }) {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreate = () => {
    setSelectedUser(null);
    setFormModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormModalOpen(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setShowModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    router.delete(admin.users.destroy(id), {
      onSuccess: () => {
        // Optional: show toast
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage all users and their permissions
            </p>
          </div>

          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New User
          </Button>
        </div>

        {/* DataTable */}
        <DataTable<User>
          columns={columns({
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
          data={users.data}
          searchKey="title"
          enableRowSelection
          enableColumnVisibility
        />
      </div>

      {/* Modals */}
      <UserFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        user={selectedUser}
      />

      <UserShowModal
        open={showModalOpen}
        onClose={() => setShowModalOpen(false)}
        user={selectedUser}
      />
    </AppLayout>
  );
}