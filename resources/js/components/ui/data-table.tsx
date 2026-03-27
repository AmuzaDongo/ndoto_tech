"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { router } from "@inertiajs/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  searchKey?: string;
  searchPlaceholder?: string;

  totalRecords: number;
  currentPage: number; // ✅ 1-based (Laravel)
  totalPages: number;
  perPage: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",

  totalRecords,
  currentPage,
  totalPages,
  perPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // ✅ HANDLE BACKEND SORTING
  React.useEffect(() => {
    if (sorting.length === 0) return;

    const sort = sorting[0];

    router.get(
      window.location.pathname,
      {
        sort: sort.id,
        direction: sort.desc ? "desc" : "asc",
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1, // ✅ correct
        pageSize: perPage,
      },
    },

    manualPagination: true,
    pageCount: totalPages,

    enableRowSelection: true,

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // UI only
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) return null;

                  const isSorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      key={header.id}
                      className={canSort ? "cursor-pointer" : ""}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {canSort && (
                          <>
                            {isSorted === "asc" && <ArrowUp size={14} />}
                            {isSorted === "desc" && <ArrowDown size={14} />}
                            {!isSorted && <ArrowUpDown size={14} />}
                          </>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ IMPORTANT: pass 1-based */}
      <DataTablePagination
        table={table}
        totalRecords={totalRecords}
        currentPage={currentPage - 1}
        totalPages={totalPages}
        perPage={perPage}
        compact={false}
      />
    </div>
  );
}