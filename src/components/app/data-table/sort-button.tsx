import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { type Column, RowData } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";

// ソート用のカスタムボタンコンポーネント
type Props<T extends RowData> = {
  children: React.ReactNode;
  column: Column<T>;
};

export function SortButton<T>({ children, column }: Props<T>) {
  const sorted = column.getIsSorted();
  const toggleSorting = useCallback(() => {
    column.toggleSorting(sorted === "asc");
  }, [column, sorted]);

  const iconClassName = useMemo(() => {
    return cn(
      "h-4 w-4",
      sorted === "asc" ? "rotate-180" : "",
      sorted ? "" : "opacity-30"
    );
  }, [sorted]);

  return (
    <Button
      variant="ghost"
      className="w-full h-full p-0 justify-between text-inverse text-xs font-bold [&:hover]:bg-transparent [&:hover]:text-inverse"
      onClick={toggleSorting}
    >
      <span>{children}</span>
      <span>
        <Icon name="arrow-down" className={iconClassName} />
      </span>
    </Button>
  );
}
