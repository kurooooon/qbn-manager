import { createFileRoute } from "@tanstack/react-router";
import {
  type ColumnDef,
  getCoreRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  type Facilitator,
  useFetchFacilitators,
} from "./use-fetch-facilitators";

export const Route = createFileRoute(
  "/_private/facilitators/_hooks/use-data-table"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return null;
}

interface UseDataTableProps {
  columns: ColumnDef<Facilitator>[];
  /**
   * ページあたりの表示件数
   */
  pageSize?: number;
  /**
   * ページングの表示最大ボタン数
   */
  pageButtonSize?: number;
}

export function useDataTable({
  columns,
  pageSize = 20,
  pageButtonSize = 5,
}: UseDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // データ取得ロジックを別のフックから取得
  const { data: items = [], isLoading, error } = useFetchFacilitators(sorting);

  const totalItems = items.length;

  // 現在のページのデータ範囲を計算
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = Math.min(startIndex + pagination.pageSize, items.length);
  const currentPageData = items.slice(startIndex, endIndex);
  const pageCount = Math.ceil(items.length / pagination.pageSize);

  /**
   * ページネーションに表示するページ番号の配列
   */
  const pageNumbers = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pagination.pageSize);

    // ページ数が少ない場合はすべて表示
    if (totalPages <= pageButtonSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 現在のページ (1ベース)
    const currentPage = pagination.pageIndex + 1;

    // 中央に配置するシンプルなアルゴリズム
    let start = Math.max(1, currentPage - Math.floor(pageButtonSize / 2));
    const end = Math.min(totalPages, start + pageButtonSize - 1);

    // 右端に寄りすぎた場合は左にシフト
    if (end === totalPages) {
      start = Math.max(1, totalPages - pageButtonSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [totalItems, pagination.pageSize, pagination.pageIndex, pageButtonSize]);

  const table = useReactTable<Facilitator>({
    data: currentPageData,
    columns,
    state: {
      sorting,
      pagination,
    },
    manualSorting: true,
    manualPagination: true,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    pageCount,
  });

  return {
    table,
    isLoading,
    error,
    totalItems,
    startIndex,
    endIndex,
    pageNumbers,
    pagination,
    pageCount,
  };
}
