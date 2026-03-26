import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectShowModalProps {
  open: boolean;
  onClose: () => void;
  project: any;
}

export default function ProjectShowModal({ open, onClose, project }: ProjectShowModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="capitalize">{project.status}</Badge>
            <Badge variant="secondary">{project.stage || '—'}</Badge>
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }} />
            </div>
            <span className="font-medium">{project.progress}%</span>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Client</h4>
            <p className="text-lg">{project.client?.name}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Service</h4>
            <p className="text-lg">{project.service?.title}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Challenge</h4>
              <p className="text-gray-700">{project.challenge || '—'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Solution</h4>
              <p className="text-gray-700">{project.solution || '—'}</p>
            </div>
          </div>

          {project.start_date && (
            <div className="flex gap-8">
              <div>
                <h4 className="font-semibold">Start Date</h4>
                <p>{format(new Date(project.start_date), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <h4 className="font-semibold">End Date</h4>
                <p>{project.end_date ? format(new Date(project.end_date), 'MMM dd, yyyy') : '—'}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}