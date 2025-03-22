import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Facilitator } from "@/models/facilitator";
import {
  type ColumnDef,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDataTable } from "../-hooks/use-data-table";

interface DataTableProps {
  data: Facilitator[];
  isLoading: boolean;
  sorting: SortingState;
  pageSize?: number;
  pageButtonSize?: number;
  onSortingChange: (sorting: SortingState) => void;
}

export function DataTable({
  data = [],
  isLoading = false,
  sorting,
  pageSize = 20,
  pageButtonSize = 5,
  onSortingChange,
}: DataTableProps) {
  // カラム定義
  const columns: ColumnDef<Facilitator>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            名前
            <span className="ml-1">
              {column.getIsSorted() === "asc" ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4 opacity-30" />
              )}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "loginId",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ログインID
            <span className="ml-1">
              {column.getIsSorted() === "asc" ? (
                <ChevronUp className="h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4 opacity-30" />
              )}
            </span>
          </div>
        );
      },
    },
  ];

  const { table, totalItems, startIndex, endIndex, pageNumbers, pagination } =
    useDataTable({
      columns,
      data,
      sorting,
      isLoading,
      pageSize,
      pageButtonSize,
      onSortingChange,
    });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-green-800 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none hover:bg-green-800"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-white font-medium h-12"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="min-h-[400px]">
            {isLoading
              ? Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <TableRow
                    key={`skeleton-${index}`}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    {columns.map((_, cellIndex) => (
                      <TableCell
                        key={`skeleton-cell-${cellIndex}`}
                        className="py-3"
                      >
                        <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {totalItems > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs">
            {totalItems}件中 {startIndex + 1}～{endIndex}件を表示
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-label="前のページへ"
                  className={
                    !table.getCanPreviousPage()
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }
                  onClick={() => table.previousPage()}
                />
              </PaginationItem>
              {pageNumbers.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber - 1 === pagination.pageIndex}
                    onClick={() => table.setPageIndex(pageNumber - 1)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  aria-label="次のページへ"
                  className={
                    !table.getCanNextPage()
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }
                  onClick={() => table.nextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
