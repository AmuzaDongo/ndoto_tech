import { router } from '@inertiajs/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from 'react';
import { toast } from 'sonner';
import * as Yup from "yup";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import admin from '@/wayfinder/routes/admin';

interface ConsultationFormModalProps {
  open: boolean;
  onClose: () => void;
  client?: any;
}

const MAX_LOGO_SIZE = 5 * 1024 * 1024;

export default function ConsultationFormModal({ open, onClose, client }: ConsultationFormModalProps) {

  const isEditing = !!client;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues = {
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
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Client name is required"),
    email: Yup.string().email("Invalid email"),
    contact_email: Yup.string().email("Invalid email"),
    website: Yup.string().url("Invalid URL"),
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    if (isEditing) {
      formData.append('_method', 'PUT');

      router.post(admin.clients.update(client.id), formData, {
        onSuccess: () => {
          toast.success('Client updated successfully');
          onClose();
        },
        onError: () => toast.error('Please check the form'),
        onFinish: () => setSubmitting(false),
      });

    } else {
      router.post(admin.clients.store(), formData, {
        onSuccess: () => {
          toast.success('Client created successfully');
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
            {isEditing ? 'Edit Client' : 'Create New Client'}
          </DialogTitle>
        </DialogHeader>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-6 py-4">

              {/* Name + Industry */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client / Company Name</Label>
                  <Field as={Input} name="name" placeholder="e.g. Ndoto Company Limited" />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                </div>

                <div>
                  <Label>Industry</Label>
                  <Field as={Input} name="industry" placeholder="e.g. Banking, Healthcare, Education" />
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <Label>Contact Person</Label>
                <Field as={Input} name="contact_person" placeholder="Full name of contact person" />
              </div>

              {/* Emails + Phones */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Field as={Input} name="email" type="email" placeholder="example@ndototech.com" />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Field as={Input} name="phone" placeholder="phone number" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contact Email</Label>
                  <Field as={Input} name="contact_email" type="email" />
                </div>

                <div>
                  <Label>Contact Phone</Label>
                  <Field as={Input} name="contact_phone" />
                </div>
              </div>

              {/* Website */}
              <div>
                <Label>Website</Label>
                <Field as={Input} name="website" type="url" placeholder="https://example.com" />
              </div>

              {/* Address */}
              <div>
                <Label>Address</Label>
                <Field as={Textarea} name="address" rows={2} />
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <Field as={Textarea} name="description" rows={4} />
              </div>

              {/* Logo Upload */}
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files[0];

                    if (file) {
                      if (file.size > MAX_LOGO_SIZE) {
                        toast.error("Max file size is 5MB");
                        return;
                      }

                      setFieldValue("logo", file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />

                {previewUrl && (
                  <img src={previewUrl} className="w-32 mt-3 border rounded" />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEditing ? "Update Client" : "Create Client"}
                </Button>
              </div>

            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}