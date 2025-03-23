import { Facilitator } from "@/models/facilitator";
import { get } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";

export type FetchParams = {
  sorting: SortingState;
  searchParams?:
    | { key: "name_like"; value: string }
    | { key: "loginId_like"; value: string };
};

async function fetchFacilitators(params: FetchParams): Promise<Facilitator[]> {
  const apiParams: Record<string, string> = {};

  if (params.sorting.length > 0) {
    const sortField = params.sorting[0].id;
    const sortOrder = params.sorting[0].desc ? "desc" : "asc";

    apiParams._sort = sortField;
    apiParams._order = sortOrder;
  }

  if (params.searchParams) {
    apiParams[params.searchParams.key] = params.searchParams.value;
  }

  return get<Facilitator[]>("/mock/facilitators", apiParams);
}

/**
 * Facilitatorデータを取得するカスタムフック
 */
export function useFetchFacilitators(params: FetchParams) {
  const { sorting, searchParams } = params;

  return useQuery({
    queryKey: [
      "facilitators",
      sorting.length > 0 ? sorting[0].id : null,
      sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : null,
      searchParams?.key,
      searchParams?.value,
    ],
    queryFn: () => fetchFacilitators(params),
  });
}
