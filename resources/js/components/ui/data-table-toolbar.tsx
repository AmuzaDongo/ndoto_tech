"use client";

import * as React from "react";
import { router } from "@inertiajs/react";
import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import { DataTableViewOptions } from "./data-table-view-options";
import { useDebounce } from "@/hooks/use-debounce";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  filterableColumns?: Array<{
    id: string;
    title: string;
    options: Array<{
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }>;
  }>;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  onExport?: () => void;
  // For bulk actions
  onBulkDelete?: (selectedIds: any[]) => void;
  onBulkStatusChange?: (selectedIds: any[], status: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchKey = "name",
  searchPlaceholder = "Search consultations...",
  enableColumnVisibility = true,
  enableExport = true,
  onExport,
}: DataTableToolbarProps<TData>) {

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  // Debounced search with Inertia
  const [searchValue, setSearchValue] = React.useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 400);

  React.useEffect(() => {
    if (debouncedSearch !== undefined) {
      router.get(
        window.location.pathname,
        {
          search: debouncedSearch || undefined,
          page: 1, // reset to first page on new search
          per_page: new URLSearchParams(window.location.search).get("per_page") || undefined,
        },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      );
    }
  }, [debouncedSearch]);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      alert("Export functionality - implement in parent component if needed");
    }
  };

  const resetFilters = () => {
    setSearchValue("");
    router.get(
      window.location.pathname,
      { page: 1 },
      { preserveState: true, preserveScroll: true, replace: true }
    );
    table.resetColumnFilters();
  };

  const isFiltered = searchValue || table.getState().columnFilters.length > 0;

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Side - Search & Filters */}
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {searchKey && (
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-9 w-full max-w-sm"
            />
          )}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="h-9 px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3">
          {/* Selection Info */}
          {selectedCount > 0 && (
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              <strong>{selectedCount}</strong> selected
            </div>
          )}

          {/* Export Button */}
          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="h-9"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}

          {/* Column Visibility */}
          {enableColumnVisibility && <DataTableViewOptions table={table} />}
        </div>
      </div>
    </TooltipProvider>
  );
}