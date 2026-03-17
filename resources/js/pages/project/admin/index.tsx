import React, { useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
  status: string;
  year: number;
};

const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Website Redesign",
    client: "ABC Company",
    category: "Web Development",
    status: "Active",
    year: 2024,
  },
  {
    id: 2,
    title: "Mobile App",
    client: "XYZ Ltd",
    category: "Mobile",
    status: "Completed",
    year: 2023,
  },
  {
    id: 3,
    title: "E-commerce Platform",
    client: "ShopEase",
    category: "Web Development",
    status: "Active",
    year: 2025,
  },
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "client", header: "Client" },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              row.original.status === "Active"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
      { accessorKey: "year", header: "Year" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredProjects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <AppLayout>
      <Head title="Projects" />

      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>

          <input
            type="text"
            placeholder="Search projects..."
            className="border rounded px-3 py-2 text-sm 
                       bg-white dark:bg-gray-800 
                       border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-lg border 
                        border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-800 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-left font-medium border-b 
                                 border-gray-200 dark:border-gray-600
                                 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 dark:border-gray-700
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3">
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.header,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}