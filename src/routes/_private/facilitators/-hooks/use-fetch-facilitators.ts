import { Facilitator } from "@/models/facilitator";
import { useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";

export type FetchParams = {
  sorting: SortingState;
  searchParams?:
    | { key: "name_like"; value: string }
    | { key: "loginId_like"; value: string };
};

async function fetchFacilitators(params: FetchParams): Promise<Facilitator[]> {
  const urlParams = new URLSearchParams();

  if (params.sorting.length > 0) {
    const sortField = params.sorting[0].id;
    const sortOrder = params.sorting[0].desc ? "desc" : "asc";

    urlParams.append("_sort", sortField);
    urlParams.append("_order", sortOrder);
  }

  if (params.searchParams) {
    urlParams.append(params.searchParams.key, params.searchParams.value);
  }

  const response = await fetch(
    `https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators?${urlParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
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
