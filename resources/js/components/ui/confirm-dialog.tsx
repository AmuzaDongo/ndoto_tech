import { useState } from "react";
import { Button } from "@/components/ui/button";

type ConfirmOptions = {
  title: string;
  description?: string;
  onConfirm: () => void;
};

export function useConfirm() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const ConfirmDialog = () => {
    if (!options) return null;

    return (
      open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold">{options.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {options.description}
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  options.onConfirm();
                  setOpen(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )
    );
  };

  return { confirm, ConfirmDialog };
}