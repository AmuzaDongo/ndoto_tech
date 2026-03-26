import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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

export type Project = {
  id: number;
  title: string;
  client: {
    id: number;
    name: string;
  };
  service: {
    id: number;
    title: string;
  };
  status: string;
  stage: string | null;
  progress: number;
  start_date?: string;
  end_date?: string;
  image?: string;
};

// Action handlers type
interface ColumnActions {
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export const columns = (actions: ColumnActions): ColumnDef<Project>[] => [
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

  // Project Title
  {
    accessorKey: "title",
    header: "Project Title",
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

  // Client
  {
    accessorKey: "client.name",
    header: "Client",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.client?.name || "—"}</div>
    ),
  },

  // Service
  {
    accessorKey: "service.title",
    header: "Service",
    enableSorting: true,
    cell: ({ row }) => row.original.service?.title || "—",
  },

  // Status
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase() ?? "";

      let variant: "default" | "secondary" | "destructive" | "outline" | "success" = "outline";

      if (status === "completed") variant = "success";
      else if (status === "cancelled") variant = "destructive";
      else if (status === "on hold") variant = "secondary";
      else if (["in progress", "review", "testing", "deployment"].includes(status)) 
        variant = "default";

      return (
        <Badge variant={variant} className="capitalize font-medium">
          {status.replace("_", " ") || "Unknown"}
        </Badge>
      );
    },
  },

  // Progress Bar
  {
    accessorKey: "progress",
    header: "Progress",
    enableSorting: true,
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      return (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-sm font-mono text-gray-700 w-10">{progress}%</span>
        </div>
      );
    },
  },

  // Stage
  {
    accessorKey: "stage",
    header: "Stage",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 capitalize">
        {row.getValue("stage") || "—"}
      </span>
    ),
  },

  // Start Date
  {
    accessorKey: "start_date",
    header: "Start Date",
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.getValue("start_date") as string;
      return date ? format(new Date(date), "MMM dd, yyyy") : "—";
    },
  },

  // Actions
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const project = row.original;

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

            <DropdownMenuItem onClick={() => actions.onView(project)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => actions.onEdit(project)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => actions.onDelete(project.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];