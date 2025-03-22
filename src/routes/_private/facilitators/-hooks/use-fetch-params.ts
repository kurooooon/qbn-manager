import { type SortingState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { type FetchParams } from "./use-fetch-facilitators";

/**
 * 検索パラメータを管理するカスタムフック
 */
export function useFetchParams() {
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    sorting: [],
    searchParams: undefined,
  });

  // 英数字のみかどうかを判定する関数
  const isAlphaNumeric = useCallback((text: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(text);
  }, []);

  // 検索実行ハンドラー
  const onSearchParamsChange = useCallback(
    (searchText: string) => {
      // 検索文字列が空の場合、検索パラメータをリセット
      if (!searchText) {
        setFetchParams((prev) => ({
          ...prev,
          searchParams: undefined,
        }));
        return;
      }

      // APIの都合上フロントでテキスト内容から検索するキーを変える
      if (isAlphaNumeric(searchText)) {
        setFetchParams((prev) => ({
          ...prev,
          searchParams: {
            key: "loginId_like",
            value: searchText,
          },
        }));
      } else {
        setFetchParams((prev) => ({
          ...prev,
          searchParams: {
            key: "name_like",
            value: searchText,
          },
        }));
      }
    },
    [isAlphaNumeric]
  );

  const onSortingChange = useCallback((sorting: SortingState) => {
    setFetchParams((prev) => ({
      ...prev,
      sorting,
    }));
  }, []);

  return {
    fetchParams,
    onSearchParamsChange,
    onSortingChange,
  };
}
