import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "./_components/data-table";

export const Route = createFileRoute("/_private/facilitators/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-w-[800px] mx-auto px-6 pt-6 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4">
          <Icon name="teacher" className="w-8" />
          <span className="text-2xl font-bold">先生</span>
        </h2>
        <Input className="w-84" placeholder="名前、ログインIDで検索" />
      </div>

      <div className="mt-6">
        <DataTable />
      </div>
    </section>
  );
}
