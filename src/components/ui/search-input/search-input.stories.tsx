import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SearchInput } from "./search-input";

const meta = {
  component: SearchInput,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 w-[336px]">
        <Story />
      </div>
    ),
  ],
};
