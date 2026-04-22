import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface UserShowModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

export default function UserShowModal({ open, onClose, user }: UserShowModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<number[]>(user?.roles?.map((r: any) => r.id) || []);
  const [availableRoles] = useState<any[]>([]);
  const [availablePermissions] = useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(user?.permissions?.map((p: any) => p.id) || []);

  const handleSaveRoles = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ roles: selectedRoles }),
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to save roles:', error);
    }
  };

  const handleSavePermissions = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}/permissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ permissions: selectedPermissions }),
      });
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to save permissions:', error);
    }
  };
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{user.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">{user.status || 'Active'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Roles</h3>
            <div className="space-y-2">
              {availableRoles.map((role) => (
                <label key={role.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role.id)}
                    onChange={(e) =>
                      setSelectedRoles(
                        e.target.checked
                          ? [...selectedRoles, role.id]
                          : selectedRoles.filter((id) => id !== role.id)
                      )
                    }
                  />
                  <span>{role.name}</span>
                </label>
              ))}
            </div>
            <Button onClick={handleSaveRoles}>Save Roles</Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permissions</h3>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <label key={permission.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={(e) =>
                      setSelectedPermissions(
                        e.target.checked
                          ? [...selectedPermissions, permission.id]
                          : selectedPermissions.filter((id) => id !== permission.id)
                      )
                    }
                  />
                  <span>{permission.name}</span>
                </label>
              ))}
            </div>
            <Button onClick={handleSavePermissions}>Save Permissions</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}