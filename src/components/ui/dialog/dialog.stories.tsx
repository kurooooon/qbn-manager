import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./dialog";

const meta = {
  component: Dialog,
  args: {
    isOpen: true,
    title: "title",
    content: "context",
    primaryButton: <Button variant="default">primary</Button>,
    secondaryButton: <Button variant="secondary">secondary</Button>,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
