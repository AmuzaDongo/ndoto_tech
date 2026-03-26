import { router } from '@inertiajs/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

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

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// ✅ Validation
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3),
  description: Yup.string().required('Description is required'),
  content: Yup.string(),
});

export default function ServiceFormModal({ open, onClose, service }: ServiceFormModalProps) {

  const isEditing = !!service;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ✅ Initial Values
  const initialValues = {
    title: service?.title || '',
    description: service?.description || '',
    content: service?.content || '',
    image: null as File | null,

    approach: service?.approach || [],
    features: service?.features || [],
    benefits: service?.benefits || [],
    technologies: service?.technologies || [],
    faq: service?.faq || [],
  };

  // ✅ Submit
  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value)); // ✅ FIXED
        } else {
          formData.append(key, value as any);
        }
      }
    });

    if (isEditing) {
      formData.append('_method', 'PUT');

      router.post(admin.services.update(service.id), formData, {
        onSuccess: () => {
          toast.success('Service updated successfully');
          onClose();
        },
        onError: () => toast.error('Please check the form'),
        onFinish: () => setSubmitting(false),
      });

    } else {
      router.post(admin.services.store(), formData, {
        onSuccess: () => {
          toast.success('Service created successfully');
          onClose();
        },
        onError: () => toast.error('Please check the form'),
        onFinish: () => setSubmitting(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditing ? 'Edit Service' : 'Create New Service'}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-6 py-4">

              {/* Title */}
              <div>
                <Label>Service Title</Label>
                <Field 
                  as={Input} 
                  name="title" 
                  placeholder="e.g. Web Development, Mobile App Development" 
                />
                <ErrorMessage name="title" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Description */}
              <div>
                <Label>Short Description</Label>
                <Field 
                  as={Input} 
                  name="description" 
                  placeholder="Brief summary of the service" 
                />
                <ErrorMessage name="description" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Content */}
              <div>
                <Label>Detailed Content</Label>
                <Field 
                  as={Textarea} 
                  name="content" 
                  rows={6} 
                  placeholder="Explain the service in detail..." 
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label>
                  Service Image <span className="text-xs text-gray-500">(Max 5MB • JPEG, PNG, WebP)</span>
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files[0];

                    if (file) {
                      if (!file.type.startsWith('image/')) {
                        toast.error('File must be an image');
                        return;
                      }

                      if (file.size > MAX_IMAGE_SIZE) {
                        toast.error('Image must be less than 5MB');
                        return;
                      }

                      setFieldValue('image', file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />

                {previewUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img 
                      src={previewUrl} 
                      className="w-48 h-48 object-cover rounded-lg border" 
                    />
                  </div>
                )}
              </div>

              {/* ARRAY FIELDS */}

              <div>
                <Label>Approach (comma separated)</Label>
                <Input
                  placeholder="Planning, Design, Development, Testing"
                  value={values.approach.join(', ')}
                  onChange={(e) =>
                    setFieldValue('approach',
                      e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                    )
                  }
                />
              </div>

              <div>
                <Label>Features (comma separated)</Label>
                <Input
                  placeholder="Responsive design, API integration, Dashboard"
                  value={values.features.join(', ')}
                  onChange={(e) =>
                    setFieldValue('features',
                      e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                    )
                  }
                />
              </div>

              <div>
                <Label>Benefits (comma separated)</Label>
                <Input
                  placeholder="Faster performance, Cost saving, Scalability"
                  value={values.benefits.join(', ')}
                  onChange={(e) =>
                    setFieldValue('benefits',
                      e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                    )
                  }
                />
              </div>

              <div>
                <Label>Technologies (comma separated)</Label>
                <Input
                  placeholder="React, Laravel, PostgreSQL, AWS"
                  value={values.technologies.join(', ')}
                  onChange={(e) =>
                    setFieldValue('technologies',
                      e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                    )
                  }
                />
              </div>

              <div>
                <Label>FAQ (comma separated)</Label>
                <Input
                  placeholder="What is the cost?, How long does it take?, Do you offer support?"
                  value={values.faq.join(', ')}
                  onChange={(e) =>
                    setFieldValue('faq',
                      e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                    )
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting 
                    ? 'Saving...' 
                    : isEditing 
                      ? 'Update Service' 
                      : 'Create Service'
                  }
                </Button>
              </div>

            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}