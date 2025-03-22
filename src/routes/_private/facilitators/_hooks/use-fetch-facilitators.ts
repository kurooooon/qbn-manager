import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type SortingState } from "@tanstack/react-table";

export const Route = createFileRoute(
  "/_private/facilitators/_hooks/use-fetch-facilitators"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return null;
}

// ファシリテーターのデータ型
export type Facilitator = {
  id: string;
  name: string;
  loginId: string;
};

// APIからデータを取得する関数
async function fetchFacilitators(
  sortField?: string,
  sortOrder?: string
): Promise<Facilitator[]> {
  // クエリパラメータを構築
  const params = new URLSearchParams();

  // ソートパラメータの追加
  if (sortField) {
    params.append("_sort", sortField);
    params.append("_order", sortOrder || "asc");
  }

  const response = await fetch(
    `https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export function useFetchFacilitators(sorting: SortingState) {
  return useQuery({
    queryKey: [
      "facilitators",
      sorting.length > 0 ? sorting[0].id : null,
      sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : null,
    ],
    queryFn: () =>
      fetchFacilitators(
        sorting.length > 0 ? sorting[0].id : undefined,
        sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : undefined
      ),
  });
}
