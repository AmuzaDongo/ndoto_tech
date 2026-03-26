import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/wayfinder/routes/admin';

interface ServiceFormModalProps {
  open: boolean;
  onClose: () => void;
  service?: any;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ServiceFormModal({ 
  open, 
  onClose, 
  service 
}: ServiceFormModalProps) {

  const isEditing = !!service;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm({
    title: service?.title || '',
    description: service?.description || '',
    content: service?.content || '',
    image: null as File | null,
    benefits: service?.benefits || [],
    technologies: service?.technologies || [],
  });

  // Set preview when editing
  useEffect(() => {
    if (isEditing && service?.image) {
      setPreviewUrl(`/storage/${service.image}`);
    }
  }, [service, isEditing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error('Image must be less than 5MB');
        return;
      }
      form.setData('image', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing 
      ? admin.services.update(service.id) 
      : admin.services.store();

    form.post(url, {
      forceFormData: true,
      onSuccess: () => {
        toast.success(isEditing ? 'Service updated successfully' : 'Service created successfully');
        onClose();
      },
      onError: () => {
        toast.error('Please check the form for errors.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditing ? 'Edit Service' : 'Create New Service'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={form.data.title}
              onChange={e => form.setData('title', e.target.value)}
            />
            {form.errors.title && <p className="text-sm text-red-500 mt-1">{form.errors.title}</p>}
          </div>

          {/* Short Description */}
          <div>
            <Label htmlFor="description">Short Description</Label>
            <Input
              id="description"
              value={form.data.description}
              onChange={e => form.setData('description', e.target.value)}
            />
            {form.errors.description && <p className="text-sm text-red-500 mt-1">{form.errors.description}</p>}
          </div>

          {/* Full Content */}
          <div>
            <Label htmlFor="content">Detailed Content</Label>
            <Textarea
              id="content"
              rows={6}
              value={form.data.content}
              onChange={e => form.setData('content', e.target.value)}
            />
            {form.errors.content && <p className="text-sm text-red-500 mt-1">{form.errors.content}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">
              Service Image <span className="text-xs text-gray-500">(Max 5MB • JPEG, PNG, WebP)</span>
            </Label>
            <Input 
              type="file" 
              id="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-48 h-48 object-cover rounded-lg border" 
                />
              </div>
            )}
          </div>

          {/* Benefits */}
          <div>
            <Label>Key Benefits (one per line)</Label>
            <Textarea
              rows={4}
              value={form.data.benefits.join('\n')}
              onChange={(e) => {
                const lines = e.target.value.split('\n').filter(Boolean);
                form.setData('benefits', lines);
              }}
              placeholder="Increased performance&#10;Better user experience"
            />
          </div>

          {/* Technologies */}
          <div>
            <Label>Technologies Used (comma separated)</Label>
            <Input 
              value={form.data.technologies.join(', ')}
              onChange={(e) => {
                const techs = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                form.setData('technologies', techs);
              }}
              placeholder="React, Laravel, PostgreSQL, AWS"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.processing}>
              {form.processing 
                ? 'Saving...' 
                : isEditing 
                  ? 'Update Service' 
                  : 'Create Service'
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}