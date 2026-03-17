import { Head } from "@inertiajs/react"
import { DataTable } from "@/components/ui/data-table"
import AppLayout from "@/layouts/app-layout"
import consultations from "@/routes/admin/consultations"
import type { BreadcrumbItem } from "@/types"

import { columns } from "./columns"


  interface Props {
  consultations: {
    data: any[]
    links: any
    meta: any
  }
  filters: {
    search?: string
    status?: string
  }
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Consultation",
    href: consultations.index(),
  },
]

export default function Index({ consultations }: Props) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultations" />

      <div className="p-8">
          <DataTable
            columns={columns}
            data={consultations.data}
            searchKey="name"
            enableRowSelection
            enableColumnVisibility
          />
      </div>
    </AppLayout>
  )
}