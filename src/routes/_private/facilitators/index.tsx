import { Icon } from "@/components/ui/icon";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "./-components/data-table";
import { SearchInput } from "./-components/search-form";
import { useFetchFacilitators } from "./-hooks/use-fetch-facilitators";
import { useFetchParams } from "./-hooks/use-fetch-params";

export const Route = createFileRoute("/_private/facilitators/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { fetchParams, onSearchParamsChange, onSortingChange } =
    useFetchParams();

  const {
    data: facilitators = [],
    isLoading,
    error,
  } = useFetchFacilitators(fetchParams);

  return (
    <section className="max-w-[800px] mx-auto px-6 pt-6 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4">
          <Icon name="teacher" className="w-8" />
          <span className="text-2xl font-bold">先生</span>
        </h2>
        <SearchInput onSearch={onSearchParamsChange} />
      </div>

      <div className="mt-6">
        <DataTable
          data={facilitators}
          isLoading={isLoading}
          sorting={fetchParams.sorting}
          onSortingChange={onSortingChange}
        />
      </div>
    </section>
  );
}
