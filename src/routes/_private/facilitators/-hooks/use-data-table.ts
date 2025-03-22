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
import { useCallback, useMemo } from "react";

interface UseDataTableProps {
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
}

/**
 * データテーブルを管理するカスタムフック
 */
export function useDataTable({
  columns,
  data,
  sorting,
  isLoading,
  pageSize = 20,
  pageButtonSize = 5,
  onSortingChange,
}: UseDataTableProps) {
  const initialPagination: PaginationState = {
    pageIndex: 0,
    pageSize,
  };

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
      pagination: initialPagination,
    },
    manualSorting: true,
    manualPagination: false,
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pageSize),
  });

  // テーブルから現在のページ情報を取得
  const { pageSize: tablePageSize, pageIndex } = table.getState().pagination;
  const startIndex = pageIndex * tablePageSize;
  const endIndex = Math.min(startIndex + tablePageSize, totalItems);
  const pageCount = table.getPageCount();

  const pageNumbers = useMemo(() => {
    // 表示するページボタンの数が全ページ数より多い場合は全ページを表示
    if (pageCount <= pageButtonSize) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    // 現在のページ (1ベース)
    const currentPage = pageIndex + 1;

    // ページボタンを中央に配置するためのオフセット計算
    const halfButtons = Math.floor(pageButtonSize / 2);

    // 開始ページと終了ページを計算
    let startPage = Math.max(1, currentPage - halfButtons);
    const endPage = Math.min(pageCount, startPage + pageButtonSize - 1);

    // 終了ページが最大を超えないよう調整
    if (endPage === pageCount) {
      startPage = Math.max(1, pageCount - pageButtonSize + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [pageIndex, pageCount, pageButtonSize]);

  return {
    table,
    isLoading,
    totalItems,
    startIndex,
    endIndex,
    pageNumbers,
    pagination: table.getState().pagination,
  };
}
