import { PaginationState, RowData, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props<T extends RowData> = {
  /**
   * ページング対象のテーブルデータ
   */
  table: Table<T>;
  /**
   * ページボタンの表示最大数
   */
  pageButtonSize: number;
  /**
   * ページング状態
   */
  pagination: PaginationState;
};

export function TablePagination<T extends RowData>({
  table,
  pageButtonSize = 5,
  pagination,
}: Props<T>) {
  // テーブルから現在のページ情報を取得
  const { pageIndex } = pagination;
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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            as="button"
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
              as="button"
              isActive={pageNumber - 1 === pagination.pageIndex}
              onClick={() => table.setPageIndex(pageNumber - 1)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            as="button"
            aria-label="次のページへ"
            className={
              !table.getCanNextPage() ? "opacity-40 pointer-events-none" : ""
            }
            onClick={() => table.nextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
