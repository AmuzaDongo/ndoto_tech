import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ServiceShowModalProps {
  open: boolean;
  onClose: () => void;
  service: any;
}

export default function ServiceShowModal({ open, onClose, service }: ServiceShowModalProps) {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="capitalize">{service.status}</Badge>
            <Badge variant="secondary">{service.stage || '—'}</Badge>
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${service.progress}%` }} />
            </div>
            <span className="font-medium">{service.progress}%</span>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Client</h4>
            <p className="text-lg">{service.client?.name}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Service</h4>
            <p className="text-lg">{service.service?.title}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{service.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Challenge</h4>
              <p className="text-gray-700">{service.challenge || '—'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Solution</h4>
              <p className="text-gray-700">{service.solution || '—'}</p>
            </div>
          </div>

          {service.start_date && (
            <div className="flex gap-8">
              <div>
                <h4 className="font-semibold">Start Date</h4>
                <p>{format(new Date(service.start_date), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <h4 className="font-semibold">End Date</h4>
                <p>{service.end_date ? format(new Date(service.end_date), 'MMM dd, yyyy') : '—'}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}