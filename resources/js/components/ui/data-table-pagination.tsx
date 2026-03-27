"use client";

import { router } from "@inertiajs/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRecords: number;
  currentPage: number;     // 0-based
  totalPages: number;
  perPage: number;
  compact?: boolean;
}

export function DataTablePagination<TData>({
  table,
  totalRecords,
  currentPage,
  totalPages,
  perPage,
  compact = false,
}: DataTablePaginationProps<TData>) {

  const from = totalRecords === 0 ? 0 : currentPage * perPage + 1;
  const to = totalRecords === 0 ? 0 : Math.min((currentPage + 1) * perPage, totalRecords);

  const goToPage = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= totalPages) return;

    router.get(
      window.location.pathname,
      {
        page: pageIndex + 1,
        per_page: perPage,
        search: new URLSearchParams(window.location.search).get('search') || undefined,
        status: new URLSearchParams(window.location.search).get('status') || undefined,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  };

  const changePageSize = (newPerPage: number) => {
    router.get(
      window.location.pathname,
      {
        page: 1,
        per_page: newPerPage,
        search: new URLSearchParams(window.location.search).get('search') || undefined,
        status: new URLSearchParams(window.location.search).get('status') || undefined,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 py-4">
      {/* Showing info */}
      <div className="text-sm text-muted-foreground">
        Showing <strong>{from}</strong> to <strong>{to}</strong> of{" "}
        <strong>{totalRecords}</strong> entries
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap hidden sm:inline">
            Rows per page
          </span>
          <Select value={`${perPage}`} onValueChange={(value) => changePageSize(Number(value))}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="text-sm font-medium whitespace-nowrap hidden md:block">
          Page {currentPage + 1} of {totalPages || 1}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className={cn("h-8 w-8", compact && "hidden lg:flex")}
            onClick={() => goToPage(0)}
            disabled={currentPage === 0}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn("h-8 w-8", compact && "hidden lg:flex")}
            onClick={() => goToPage(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}