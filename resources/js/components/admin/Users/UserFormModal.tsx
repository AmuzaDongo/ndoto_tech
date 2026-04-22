import { router } from '@inertiajs/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/wayfinder/routes/admin';

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  user?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().optional(),
});

export default function UserFormModal({ open, onClose, user,  }: UserFormModalProps) {
  const isEditing = !!user;

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    status: user?.status || 'Planning',
  };

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    if (isEditing) {
      formData.append('_method', 'PUT');

      router.post(admin.users.update(user.id), formData, {
        onSuccess: () => {
          toast.success('User updated successfully');
          onClose();
        },
        onError: () => toast.error('Please check the form'),
        onFinish: () => setSubmitting(false),
      });

    } else {
      router.post(admin.users.store(), formData, {
        onSuccess: () => {
          toast.success('User created successfully');
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
          <DialogTitle>{isEditing ? 'Edit User' : 'Create New User'}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">User Name</Label>
                <Field as={Input} id="name" name="name" />
                <ErrorMessage name="name" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Field as={Input} id="email" name="email" type="email" />
                <ErrorMessage name="email" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Field as={Input} id="password" name="password" type="password" />
                <ErrorMessage name="password" component="p" className="text-sm text-red-500 mt-1" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}