import { router } from '@inertiajs/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/wayfinder/routes/admin';

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
  project?: any;
  clients: any[];
  services: any[];
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3),
  client_id: Yup.string().required('Client is required'),
  service_id: Yup.string().required('Service is required'),
  description: Yup.string().required('Description is required'),
  challenge: Yup.string(),
  solution: Yup.string(),
  status: Yup.string().required('Status is required'),
  stage: Yup.string(),
  progress: Yup.number().min(0).max(100),
  start_date: Yup.date().nullable(),
  end_date: Yup.date().nullable().min(Yup.ref('start_date'), 'End date must be after start date'),
  budget: Yup.number().min(0).nullable(),
});

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function ProjectFormModal({ open, onClose, project, clients, services }: ProjectFormModalProps) {
  const isEditing = !!project;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues = {
    title: project?.title || '',
    client_id: project?.client_id?.toString() || '',
    service_id: project?.service_id?.toString() || '',
    description: project?.description || '',
    challenge: project?.challenge || '',
    solution: project?.solution || '',
    status: project?.status || 'Planning',
    stage: project?.stage || '',
    progress: project?.progress || 0,
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
    budget: project?.budget || '',
    image: null as File | null,
  };

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    if (isEditing) {
      formData.append('_method', 'PUT');

      router.post(admin.projects.update(project.id), formData, {
        onSuccess: () => {
          toast.success('Project updated successfully');
          onClose();
        },
        onError: () => toast.error('Please check the form'),
        onFinish: () => setSubmitting(false),
      });

    } else {
      router.post(admin.projects.store(), formData, {
        onSuccess: () => {
          toast.success('Project created successfully');
          onClose();
        },
        onError: () => toast.error('Please check the form'),
        onFinish: () => setSubmitting(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Project' : 'Create New Project'}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Field as={Input} id="title" name="title" />
                <ErrorMessage name="title" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Client + Service */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client</Label>
                  <Select value={values.client_id} onValueChange={(v) => setFieldValue('client_id', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="client_id" component="p" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <Label>Service</Label>
                  <Select value={values.service_id} onValueChange={(v) => setFieldValue('service_id', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="service_id" component="p" className="text-sm text-red-500 mt-1" />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Field as={Textarea} id="description" name="description" rows={3} />
                <ErrorMessage name="description" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Status & Progress */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={values.status} onValueChange={(v) => setFieldValue('status', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                      <SelectItem value="Deployment">Deployment</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Stage</Label>
                  <Select value={values.stage} onValueChange={(v) => setFieldValue('stage', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Discovery">Discovery</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                      <SelectItem value="Deployment">Deployment</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Progress (%)</Label>
                  <Field as={Input} type="number" name="progress" min="0" max="100" />
                </div>
              </div>

              {/* Dates & Budget */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Field as={Input} type="date" name="start_date" />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Field as={Input} type="date" name="end_date" />
                </div>
                <div>
                  <Label>Budget</Label>
                  <Field as={Input} type="number" name="budget" placeholder="0.00" />
                </div>
              </div>
              <div>
                <Label>Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files[0];

                    if (file) {
                      if (file.size > MAX_IMAGE_SIZE) {
                        toast.error("Max file size is 5MB");
                        return;
                      }

                      setFieldValue("image", file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />

                {previewUrl && (
                  <img src={previewUrl} className="w-32 mt-3 border rounded" />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}