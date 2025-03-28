import { TablePagination } from "@/components/app/table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type ColumnDef,
  flexRender,
  RowData,
  type SortingState,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { useDataTable } from "./hooks/use-data-table";

type Props<T extends RowData> = {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading: boolean;
  sorting: SortingState;
  pageSize?: number;
  pageButtonSize?: number;
  onSortingChange: (sorting: SortingState) => void;
};

export function DataTable<T>({
  data = [],
  columns,
  isLoading = false,
  sorting,
  pageSize = 20,
  pageButtonSize = 5,
  onSortingChange,
}: Props<T>) {
  const { table, totalItems, startIndex, endIndex, pagination } = useDataTable({
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
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <colgroup>
            <col className="w-[288px]" />
            <col className="w-[288px]" />
            <col />
          </colgroup>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none hover:bg-inherit"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "pl-4 pr-2",
                      header.column.getIsSorted() ? "bg-background-primary" : ""
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="min-h-[400px]">
            <TableRows
              isLoading={isLoading}
              table={table}
              pageSize={pageSize}
              columns={columns}
            />
          </TableBody>
        </Table>
      </div>

      {totalItems > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs">
            {totalItems}件中 {startIndex + 1}～{endIndex}件を表示
          </p>
          <TablePagination
            table={table}
            pageButtonSize={pageButtonSize}
            pagination={pagination}
          />
        </div>
      )}
    </div>
  );
}

type TableRowsProps<T extends RowData> = {
  isLoading: boolean;
  table: TanstackTable<T>;
  pageSize: number;
  columns: ColumnDef<T>[];
};

function TableRows<T>({
  isLoading,
  table,
  pageSize,
  columns,
}: TableRowsProps<T>) {
  if (isLoading) {
    // ローディング中はスケルトンを表示
    return Array.from({ length: pageSize }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {columns.map((_, cellIndex) => (
          <TableCell key={`skeleton-cell-${cellIndex}`}>
            {cellIndex < columns.length - 1 ? (
              <Skeleton
                style={{ width: `${Math.floor(60 + Math.random() * 40)}%` }}
              >
                <span className="invisible">loading</span>
              </Skeleton>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="truncate">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}
