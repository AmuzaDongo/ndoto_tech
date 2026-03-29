import { router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/components/ui/confirm-provider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import admin from '@/wayfinder/routes/admin';

interface ConsultationShowModalProps {
  open: boolean;
  onClose: () => void;
  consultation: any;
  onUpdate: (updatedConsultation: any) => void; // Pass updated consultation to parent
}

export default function ConsultationShowModal({
  open,
  onClose,
  consultation,
  onUpdate,
}: ConsultationShowModalProps) {
  const { confirm } = useConfirm();

  if (!consultation) return null;

  const status = consultation.status?.toLowerCase();

  const getStatusVariant = () => {
    if (status === 'completed') return 'success';
    if (status === 'approved' || status === 'in_progress') return 'default';
    if (status === 'rejected') return 'destructive';
    return 'secondary';
  };

  const updateStatus = (newStatus: string) => {
    confirm({
      title: `Mark as ${newStatus.replace('_', ' ')}`,
      description: `Are you sure you want to mark this consultation as ${newStatus}?`,
      onConfirm: async () => {
        const promise = new Promise((resolve, reject) => {
          router.put(
            admin.consultations.update(consultation.id),
            { status: newStatus },
            {
              onSuccess: (page) => {
                // Update local table instantly
                onUpdate({ ...consultation, status: newStatus });
                onClose(); // Auto-close modal
                resolve(page);
              },
              onError: reject,
            }
          );
        });

        toast.promise(promise, {
          loading: 'Updating status...',
          success: `Status updated to ${newStatus} ✅`,
          error: 'Failed to update status ❌',
        });

        await promise;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between pt-3">
            <span>{consultation.name}</span>

            <motion.div
              key={status} // triggers animation when status changes
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge variant={getStatusVariant()} className="capitalize">
                {status}
              </Badge>
            </motion.div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm text-muted-foreground">Company</h4>
              <p className="text-lg font-semibold">
                {consultation.company || '—'}
              </p>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground">Service</h4>
              <p className="text-lg font-semibold">{consultation.service}</p>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground">Budget</h4>
              <p className="text-lg font-semibold">{consultation.budget || '—'}</p>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground">Preferred Date</h4>
              <p className="text-lg font-semibold">
                {consultation.preferred_date
                  ? format(parseISO(consultation.preferred_date), "MMM dd, yyyy")
                  : "—"}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{consultation.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{consultation.phone || '—'}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h4 className="font-semibold mb-2">Message</h4>
            <p className="text-muted-foreground leading-relaxed">
              {consultation.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {status === 'approved' && (
              <Button onClick={() => updateStatus('in_progress')}>Start Service</Button>
            )}

            {status === 'in_progress' && (
              <Button
                variant="default"
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => updateStatus('completed')}
              >
                Mark as Completed
              </Button>
            )}

            {status === 'pending' && (
              <Button
                variant="destructive"
                onClick={() => updateStatus('rejected')}
              >
                Reject
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}