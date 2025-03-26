import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  type OnChangeFn,
  type PaginationState,
  RowData,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useState } from "react";

type Props<T extends RowData> = {
  columns: ColumnDef<T>[];
  /**
   * 表示するデータ
   */
  data: T[];
  /**
   * ソート状態
   */
  sorting: SortingState;
  /**
   * データ読み込み中かどうか
   */
  isLoading: boolean;
  /**
   * ページあたりの表示件数
   */
  pageSize?: number;
  /**
   * ページングの表示最大ボタン数
   */
  pageButtonSize?: number;
  /**
   * ソート変更時のコールバック
   */
  onSortingChange: (sorting: SortingState) => void;
};

/**
 * データテーブルを管理するカスタムフック
 */
export const useDataTable = <T>({
  columns,
  data,
  sorting,
  isLoading,
  pageSize = 20,
  onSortingChange,
}: Props<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const handleSortingChange = useCallback<OnChangeFn<SortingState>>(
    (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;

      onSortingChange(newSorting);
    },
    [onSortingChange, sorting]
  );

  const totalItems = data.length;

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    manualSorting: true,
    manualPagination: false,
    onSortingChange: handleSortingChange,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pageSize),
  });

  // テーブルから現在のページ情報を取得
  const { pageSize: tablePageSize, pageIndex } = pagination;
  const startIndex = pageIndex * tablePageSize;
  const endIndex = Math.min(startIndex + tablePageSize, totalItems);

  return {
    table,
    isLoading,
    totalItems,
    startIndex,
    endIndex,
    pagination,
  };
};
