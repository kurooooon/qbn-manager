import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { Facilitator } from "@/models/facilitator";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useFetchFacilitators } from "../../-hooks/use-fetch-facilitators";
import { useFetchParams } from "../../-hooks/use-fetch-params";
import {
  DataTable,
  DataTableSortButton,
} from "../../../../../components/app/data-table";
import { SearchForm } from "../search-form";

export const FacilitatorsContent = () => {
  const { fetchParams, onSearchParamsChange, onSortingChange } =
    useFetchParams();

  const {
    data: facilitators = [],
    refetch,
    isLoading,
    error,
  } = useFetchFacilitators(fetchParams);

  const columns: ColumnDef<Facilitator>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <DataTableSortButton column={column}>名前</DataTableSortButton>
          );
        },
      },
      {
        accessorKey: "loginId",
        header: ({ column }) => {
          return (
            <DataTableSortButton column={column}>
              ログインID
            </DataTableSortButton>
          );
        },
      },
      {
        id: "dummy",
        header: () => null,
        cell: () => null,
      },
    ],
    []
  );

  return (
    <section className="max-w-[800px] mx-auto px-6 pt-6 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4">
          <Icon name="teacher" className="w-8" />
          <span className="text-2xl font-bold">先生</span>
        </h2>
        <SearchForm onSearch={onSearchParamsChange} />
      </div>

      {isLoading || facilitators.length > 0 ? (
        <div className="mt-6">
          <DataTable
            data={facilitators}
            columns={columns}
            isLoading={isLoading}
            sorting={fetchParams.sorting}
            onSortingChange={onSortingChange}
          />
        </div>
      ) : (
        <p className="text-muted-foreground mt-10">
          該当するデータはありません
        </p>
      )}

      <Dialog
        isOpen={!!error}
        title="通信エラーが発生しました。"
        primaryButton={<Button onClick={() => refetch()}>リトライ</Button>}
      />
    </section>
  );
};
