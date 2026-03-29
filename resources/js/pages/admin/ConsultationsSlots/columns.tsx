import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Consultation = {
  id: number
  name: string
  email: string
  service: string
  preferred_date: string
  status: "pending" | "approved" | "rejected" | "completed" | string
}

interface ColumnActions {
  onView: (consultation: Consultation) => void;
  onApprove: (consultation: Consultation) => void;
  onReject: (consultation: Consultation) => void;
  onDelete: (id: number) => void;
}

export const columns = (actions: ColumnActions): ColumnDef<Consultation>[] => [
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

  // ── Client name ───────────────────────────────────────────────────────
  {
    accessorKey: "name",
    header: "Client",
    enableSorting: true,
  },

  // ── Email ─────────────────────────────────────────────────────────────
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },

  // ── Service ───────────────────────────────────────────────────────────
  {
    accessorKey: "service",
    header: "Service",
    enableSorting: true,
  },

  // ── Preferred Date ────────────────────────────────────────────────────
  {
    accessorKey: "preferred_date",
    header: "Date",
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.getValue("preferred_date") as string
      // Safeguard + nice formatting
      return date ? format(new Date(date), "MMM dd, yyyy") : "—"
    },
  },

  // ── Status with colored badges ────────────────────────────────────────
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase() ?? ""

      let variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "success" = "outline";

      if (status.includes("approved") || status === "completed") {
        variant = "success";
      } else if (status.includes("rejected")) {
        variant = "destructive";
      } else if (status.includes("pending")) {
        variant = "secondary";
      }

      return <Badge variant={variant}>{status || "Unknown"}</Badge>;
    },
  },

  // ── Actions column ────────────────────────────────────────────────────
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const consultation = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(consultation.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => actions.onView(consultation)}>View details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => actions.onApprove(consultation)} disabled={consultation.status === "approved"}>Approve</DropdownMenuItem>
            <DropdownMenuItem  onClick={() => actions.onReject(consultation)} disabled={consultation.status === "rejected"} className="text-destructive">
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={() => actions.onDelete(consultation.id)} className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]