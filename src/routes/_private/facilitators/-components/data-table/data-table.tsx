import { TablePagination } from "@/components/app/table-pagination";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
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
import { type Facilitator } from "@/models/facilitator";
import {
  type Column,
  type ColumnDef,
  flexRender,
  type SortingState,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { useDataTable } from "../../-hooks/use-data-table";

// ソート用のカスタムボタンコンポーネント
type SortButtonProps = {
  children: React.ReactNode;
  column: Column<Facilitator, unknown>;
};

const SortButton = ({ children, column }: SortButtonProps) => {
  const sorted = column.getIsSorted();
  const toggleSorting = useCallback(() => {
    column.toggleSorting(sorted === "asc");
  }, [column, sorted]);

  const iconClassName = useMemo(() => {
    return cn(
      "h-4 w-4",
      sorted === "asc" ? "rotate-180" : "",
      sorted ? "" : "opacity-30"
    );
  }, [sorted]);

  return (
    <Button
      variant="ghost"
      className="w-full h-full p-0 justify-between text-inverse text-xs font-bold [&:hover]:bg-transparent [&:hover]:text-inverse"
      onClick={toggleSorting}
    >
      <span>{children}</span>
      <span>
        <Icon name="arrow-down" className={iconClassName} />
      </span>
    </Button>
  );
};

type DataTableProps = {
  data: Facilitator[];
  isLoading: boolean;
  sorting: SortingState;
  pageSize?: number;
  pageButtonSize?: number;
  onSortingChange: (sorting: SortingState) => void;
};

// カラム定義
const columns: ColumnDef<Facilitator>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortButton column={column}>名前</SortButton>;
    },
  },
  {
    accessorKey: "loginId",
    header: ({ column }) => {
      return <SortButton column={column}>ログインID</SortButton>;
    },
  },
  {
    id: "dummy",
    header: () => null,
    cell: () => null,
  },
];

export const DataTable = ({
  data = [],
  isLoading = false,
  sorting,
  pageSize = 20,
  pageButtonSize = 5,
  onSortingChange,
}: DataTableProps) => {
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
};

type TableRowsProps = {
  isLoading: boolean;
  table: TanstackTable<Facilitator>;
  pageSize: number;
};

const TableRows = ({ isLoading, table, pageSize }: TableRowsProps) => {
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
};
