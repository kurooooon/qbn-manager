import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_private/facilitators")({
  component: RouteComponent,
});

function RouteComponent() {
  const pageCount = 5;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="max-w-[800px] mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4">
          <Icon name="teacher" className="w-8" />
          <span className="text-2xl font-bold">先生</span>
        </h2>
        <Input className="w-84" placeholder="名前、ログインIDで検索" />
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>ログインID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>名前01</TableCell>
              <TableCell>ログインID01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>名前02</TableCell>
              <TableCell>ログインID02</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-6">
          <p className="text-xs">120件中 1〜20件を表示</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    currentPage <= 0 ? "opacity-40 pointer-events-none" : ""
                  }
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={index == currentPage}
                    onClick={() => setCurrentPage(index)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className={
                    currentPage >= pageCount - 1
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
