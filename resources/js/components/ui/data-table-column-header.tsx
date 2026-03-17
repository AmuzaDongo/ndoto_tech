"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
  EyeOpenIcon,           // optional: show when hidden
} from "@radix-ui/react-icons"

import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  /**
   * Optional: show "Pin" options if your table supports column pinning
   */
  enablePinning?: boolean
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  enablePinning = false,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted()
  const canSort = column.getCanSort()
  const canHide = column.getCanHide()
  const isPinned = column.getIsPinned()

  if (!canSort && !canHide) {
    return (
      <div className={cn("flex items-center font-medium", className)}>
        {title}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center space-x-2 select-none", className)}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "-ml-3 h-8 px-2 lg:px-3",
                    isSorted && "text-foreground font-medium",
                    column.getIsPinned() && "bg-accent/40"
                  )}
                >
                  <span>{title}</span>
                  {isSorted === "asc" ? (
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                  ) : isSorted === "desc" ? (
                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                  ) : canSort ? (
                    <CaretSortIcon className="ml-2 h-4 w-4 opacity-50" />
                  ) : null}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-44">
                {canSort && (
                  <>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Sort
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => column.toggleSorting(false)}
                      disabled={isSorted === "asc"}
                    >
                      <ArrowUpIcon className="mr-2 h-3.5 w-3.5" />
                      Ascending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => column.toggleSorting(true)}
                      disabled={isSorted === "desc"}
                    >
                      <ArrowDownIcon className="mr-2 h-3.5 w-3.5" />
                      Descending
                    </DropdownMenuItem>
                    {isSorted && (
                      <DropdownMenuItem onClick={() => column.clearSorting()}>
                        <CaretSortIcon className="mr-2 h-3.5 w-3.5" />
                        Clear sort
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                  </>
                )}

                {canHide && (
                  <DropdownMenuItem onClick={() => column.toggleVisibility()}>
                    {column.getIsVisible() ? (
                      <>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5" />
                        Hide column
                      </>
                    ) : (
                      <>
                        <EyeOpenIcon className="mr-2 h-3.5 w-3.5" />
                        Show column
                      </>
                    )}
                  </DropdownMenuItem>
                )}

                {enablePinning && column.getCanPin() && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Pin
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => column.pin("left")}
                      disabled={isPinned === "left"}
                    >
                      Pin to left
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => column.pin("right")}
                      disabled={isPinned === "right"}
                    >
                      Pin to right
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => column.pin(false)}
                      disabled={!isPinned}
                    >
                      Unpin
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>

        <TooltipContent side="top" className="text-xs">
          {canSort && (
            <>
              Click to sort • <kbd>Shift</kbd> + click for multi-sort
            </>
          )}
          {canSort && canHide && <br />}
          {canHide && "Right-click header for more options"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}