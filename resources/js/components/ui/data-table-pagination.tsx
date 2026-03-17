"use client"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils" // assuming you have this utility

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  
  compact?: boolean
 
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
  table,
  compact = true,
  pageSizeOptions = [5, 10, 20, 30, 50],
}: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const filteredCount = table.getFilteredRowModel().rows.length
  const totalCount = table.getCoreRowModel().rows.length // total before filtering
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const pageSize = table.getState().pagination.pageSize

  const hasPrevious = table.getCanPreviousPage()
  const hasNext = table.getCanNextPage()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 py-4">
      {/* Left side - selection & total info */}
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        {selectedCount > 0 ? (
          <span>
            <strong>{selectedCount}</strong> of <strong>{filteredCount}</strong> row(s) selected
          </span>
        ) : (
          <span>
            Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> entries
          </span>
        )}
      </div>

      {/* Right side - pagination controls */}
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 order-1 sm:order-2">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap hidden sm:inline">
            Rows per page
          </span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              // Reset to first page when changing page size (common UX pattern)
              table.setPageIndex(0)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="text-sm font-medium whitespace-nowrap hidden md:block">
          Page {pageIndex + 1} of {pageCount || 1}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className={cn("hidden lg:flex h-8 w-8", compact && "lg:hidden")}
            onClick={() => table.setPageIndex(0)}
            disabled={!hasPrevious}
            aria-label="Go to first page"
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!hasPrevious}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.nextPage()}
            disabled={!hasNext}
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn("hidden lg:flex h-8 w-8", compact && "lg:hidden")}
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!hasNext}
            aria-label="Go to last page"
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}