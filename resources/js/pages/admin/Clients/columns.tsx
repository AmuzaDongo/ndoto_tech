import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

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

export type Client = {
  id: number;
  name: string;
  industry?: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
  projects_count?: number;
  logo?: string;
};

interface ColumnActions {
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}

export const columns = (actions: ColumnActions): ColumnDef<Client>[] => [
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

   {
    accessorKey: "logo",
    header: "Logo",
    enableSorting: true,
    cell: ({ row }) => (
      <img src={`/storage/${row.getValue("logo")}`} className="max-w-20 max-h-10" alt="logo" />
    ),
  },

  // Client Name
  {
    accessorKey: "name",
    header: "Client Name",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-semibold text-gray-900">{row.getValue("name")}</div>
    ),
  },

  // Industry
  {
    accessorKey: "industry",
    header: "Industry",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="capitalize text-sm text-gray-600">
        {row.getValue("industry") || "—"}
      </span>
    ),
  },

  // Email
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    cell: ({ row }) => row.getValue("email") || "—",
  },

  // Projects Count
  {
    accessorKey: "projects_count",
    header: "Projects",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-medium text-center text-blue-600">
        {row.original.projects_count || 0}
      </div>
    ),
  },

  // Actions
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const client = row.original;

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

            <DropdownMenuItem onClick={() => actions.onView(client)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => actions.onEdit(client)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Client
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => actions.onDelete(client.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];