import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/wayfinder/routes/admin';

interface ClientFormModalProps {
  open: boolean;
  onClose: () => void;
  client?: any;
}

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB

export default function ClientFormModal({ 
  open, 
  onClose, 
  client 
}: ClientFormModalProps) {

  const isEditing = !!client;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm({
    name: client?.name || '',
    industry: client?.industry || '',
    website: client?.website || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    description: client?.description || '',
    contact_person: client?.contact_person || '',
    contact_email: client?.contact_email || '',
    contact_phone: client?.contact_phone || '',
    logo: null as File | null,
    tags: client?.tags || [],
  });

  // Set initial logo preview when editing
  useEffect(() => {
    if (isEditing && client?.logo) {
      setPreviewUrl(`/storage/${client.logo}`);
    }
  }, [client, isEditing]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_LOGO_SIZE) {
        toast.error('Logo must be less than 5MB');
        return;
      }
      form.setData('logo', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing 
      ? admin.clients.update(client.id) 
      : admin.clients.store();

    form.post(url, {
      forceFormData: true,
      onSuccess: () => {
        toast.success(isEditing ? 'Client updated successfully' : 'Client created successfully');
        onClose();
      },
      onError: () => {
        toast.error('Please check the form for errors.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditing ? 'Edit Client' : 'Create New Client'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div  className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Client / Company Name</Label>
              <Input
                id="name"
                value={form.data.name}
                onChange={e => form.setData('name', e.target.value)}
                placeholder="e.g. Stanbic Bank Uganda"
              />
              {form.errors.name && <p className="text-sm text-red-500 mt-1">{form.errors.name}</p>}
            </div>

            {/* Industry */}
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={form.data.industry}
                onChange={e => form.setData('industry', e.target.value)}
                placeholder="e.g. Banking, Healthcare, Education"
              />
            </div>

            {/* Contact Person */}
            <div>
              <Label htmlFor="contact_person">Contact Person</Label>
              <Input
                id="contact_person"
                value={form.data.contact_person}
                onChange={e => form.setData('contact_person', e.target.value)}
                placeholder="Full name of contact person"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.data.email}
                onChange={e => form.setData('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.data.phone}
                onChange={e => form.setData('phone', e.target.value)}
              />
            </div>
          
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={form.data.contact_email}
                onChange={e => form.setData('contact_email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={form.data.contact_phone}
                onChange={e => form.setData('contact_phone', e.target.value)}
              />
            </div>
         
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={form.data.website}
                onChange={e => form.setData('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={form.data.address}
              onChange={e => form.setData('address', e.target.value)}
              rows={2}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.data.description}
              onChange={e => form.setData('description', e.target.value)}
              rows={4}
            />
          </div>

          {/* Logo Upload */}
          <div>
            <Label htmlFor="logo">
              Client Logo <span className="text-xs text-gray-500">(Max 5MB • JPEG, PNG, WebP)</span>
            </Label>
            <Input 
              type="file" 
              id="logo"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleLogoChange}
            />
            
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Logo Preview" 
                  className="w-32 h-32 object-contain border rounded-lg" 
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.processing}>
              {form.processing 
                ? 'Saving...' 
                : isEditing 
                  ? 'Update Client' 
                  : 'Create Client'
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}