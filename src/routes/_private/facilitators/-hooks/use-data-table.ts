import { Facilitator } from "@/models/facilitator";
import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useState } from "react";

type UseDataTableProps = {
  columns: ColumnDef<Facilitator>[];
  /**
   * 表示するデータ
   */
  data: Facilitator[];
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
export const useDataTable = ({
  columns,
  data,
  sorting,
  isLoading,
  pageSize = 20,
  onSortingChange,
}: UseDataTableProps) => {
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

  const table = useReactTable<Facilitator>({
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
