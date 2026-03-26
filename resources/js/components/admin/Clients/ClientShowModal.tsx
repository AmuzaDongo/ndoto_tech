import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ClientShowModalProps {
  open: boolean;
  onClose: () => void;
  client: any;
}

export default function ClientShowModal({ open, onClose, client }: ClientShowModalProps) {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            {client.name}
            {client.logo && (
              <img 
                src={`/storage/${client.logo}`} 
                alt={client.name} 
                className="w-8 h-8 object-contain rounded" 
              />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Industry</h4>
              <p className="text-lg font-semibold">{client.industry || '—'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Website</h4>
              <p className="text-lg">
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {client.website}
                  </a>
                ) : '—'}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {client.contact_person && (
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium">{client.contact_person}</p>
                </div>
              )}
              {client.email && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{client.email}</p>
                </div>
              )}
              {client.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{client.phone}</p>
                </div>
              )}
              {client.contact_email && (
                <div>
                  <p className="text-sm text-gray-500">Contact Email</p>
                  <p className="font-medium">{client.contact_email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {client.description && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">{client.description}</p>
            </div>
          )}

          {/* Projects Count */}
          <div>
            <h4 className="font-semibold mb-2">Associated Projects</h4>
            <p className="text-2xl font-bold text-blue-600">
              {client.projects_count || 0} Projects
            </p>
          </div>

          {/* Tags */}
          {client.tags && client.tags.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}