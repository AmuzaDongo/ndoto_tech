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
import type { User } from "@/types/auth";



// Action handlers type
interface ColumnActions {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const columns = (actions: ColumnActions): ColumnDef<User>[] => [
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

  // name
  {
    accessorKey: "name",
    header: "User Name",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-semibold text-gray-900">{row.getValue("name")}</div>
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

  // email
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.email || "—"}</div>
    ),
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

  // Actions
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const user = row.original;

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

            <DropdownMenuItem onClick={() => actions.onView(user)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => actions.onEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => actions.onDelete(user.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];