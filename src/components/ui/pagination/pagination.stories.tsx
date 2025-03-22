import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const meta = {
  component: Pagination,
  args: {
    currentPage: 0,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [args, updateArgs] = useArgs();
    const pageCount = 5;
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                args.currentPage <= 0 ? "opacity-40 pointer-events-none" : ""
              }
              onClick={() => updateArgs({ currentPage: args.currentPage - 1 })}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                // href="#"
                isActive={index == args.currentPage}
                onClick={() => updateArgs({ currentPage: index })}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={
                args.currentPage >= pageCount - 1
                  ? "opacity-40 pointer-events-none"
                  : ""
              }
              onClick={() => updateArgs({ currentPage: args.currentPage + 1 })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};
