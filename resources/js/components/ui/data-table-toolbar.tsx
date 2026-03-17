"use client"

import * as React from "react"
import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { useDebounce } from "@/hooks/use-debounce" 

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
  filterableColumns?: Array<{
    id: string
    title: string
    options: Array<{
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }>
  }>
  enableColumnVisibility?: boolean
  enableExport?: boolean
  onExport?: (selectedOnly?: boolean) => void
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  filterableColumns = [],
  enableColumnVisibility = true,
  enableExport = true,
  onExport,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const filteredCount = table.getFilteredRowModel().rows.length
  const totalCount = table.getCoreRowModel().rows.length

  // Debounce search input
  const [searchValue, setSearchValue] = React.useState<string>(
    (searchKey ? (table.getColumn(searchKey)?.getFilterValue() as string) : "") ?? ""
  )
  const debouncedSearch = useDebounce(searchValue, 300)

  React.useEffect(() => {
    if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue(debouncedSearch)
    }
  }, [debouncedSearch, table, searchKey])

  const handleExport = () => {
    if (onExport) {
      // Pass true if you want to export only selected rows
      onExport(selectedCount > 0)
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left side: filters & search */}
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {searchKey && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-8 w-full min-w-[180px] sm:w-[220px] lg:w-[280px]"
                  aria-label="Search table"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Search by {searchKey}
              </TooltipContent>
            </Tooltip>
          )}

          {filterableColumns.map((col) => {
            const column = table.getColumn(col.id)
            if (!column) return null

            return (
              <DataTableFacetedFilter
                key={col.id}
                column={column}
                title={col.title}
                options={col.options}
              />
            )
          })}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters()
                if (searchKey) setSearchValue("")
              }}
              className="h-8 px-2 lg:px-3"
              aria-label="Reset all filters"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Right side: stats + actions */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Selection info */}
          {selectedCount > 0 || filteredCount < totalCount ? (
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {selectedCount > 0 ? (
                <>
                  <span className="font-medium">{selectedCount}</span> selected
                </>
              ) : null}
              {filteredCount < totalCount && (
                <>
                  {selectedCount > 0 ? " • " : ""}
                  Showing <span className="font-medium">{filteredCount}</span> of{" "}
                  <span className="font-medium">{totalCount}</span>
                </>
              )}
            </div>
          ) : null}

          {/* Export */}
          {enableExport && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={handleExport}
                  disabled={filteredCount === 0}
                  aria-label="Export table data"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {selectedCount > 0
                  ? `Export ${selectedCount} selected rows`
                  : `Export all ${filteredCount} visible rows`}
              </TooltipContent>
            </Tooltip>
          )}

          {/* Column visibility */}
          {enableColumnVisibility && <DataTableViewOptions table={table} />}

          {/* Future: Bulk actions placeholder */}
          {/* {selectedCount > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <span className="mr-2">Bulk actions</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Approve selected</DropdownMenuItem>
                <DropdownMenuItem>Reject selected</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )} */}
        </div>
      </div>
    </TooltipProvider>
  )
}