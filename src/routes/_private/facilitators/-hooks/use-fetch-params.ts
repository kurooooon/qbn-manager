import { isAlphaNumeric } from "@/utils/stringUtils";
import { type SortingState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { type FetchParams } from "./use-fetch-facilitators";

/**
 * 検索パラメータを管理するカスタムフック
 */
export const useFetchParams = () => {
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    sorting: [],
    searchParams: undefined,
  });

  // 検索実行ハンドラー
  const onSearchParamsChange = useCallback((searchText: string) => {
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
  }, []);

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
};
