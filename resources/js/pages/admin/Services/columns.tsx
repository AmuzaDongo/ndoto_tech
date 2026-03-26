import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Service = {
  id: number;
  title: string;
  description: string;
  content?: string;
  image?: string;
  projects_count?: number;
};

interface ColumnActions {
  onView: (service: Service) => void;
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

export const columns = (actions: ColumnActions): ColumnDef<Service>[] => [
  // Checkbox Column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Service Title
  {
    accessorKey: "title",
    header: "Service Title",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-semibold text-gray-900">{row.getValue("title")}</div>
    ),
  },

  {
    accessorKey: "image",
    header: "Image",
    enableSorting: true,
    cell: ({ row }) => (
      <img src={`/storage/${row.getValue("image")}`} className="max-w-10 max-h-10 rounded" alt="image" />
    ),
  },

  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return (
        <div className="text-sm text-gray-600 line-clamp-2 max-w-md">
          {desc || "—"}
        </div>
      );
    },
  },

  {
    accessorKey: "projects_count",
    header: "Projects",
    enableSorting: true,
    cell: ({ row }) => (
      <Badge className="font-medium text-center">
        {row.original.projects_count || 0}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const service = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => actions.onView(service)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => actions.onEdit(service)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Service
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => actions.onDelete(service.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];