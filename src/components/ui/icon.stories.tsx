import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";
import { Icon, iconNames } from "./icon";

const meta = {
  component: Fragment,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {iconNames.map((name) => (
        <span key={name} className="flex items-center gap-2">
          <Icon name={name} className="w-8 text-primary" />
          <span>{name}</span>
        </span>
      ))}
    </div>
  ),
};
