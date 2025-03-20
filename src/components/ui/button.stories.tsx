import type { Meta, StoryObj } from "@storybook/react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonVariants = NonNullable<ButtonVariantProps["variant"]>;
type ButtonSizes = NonNullable<ButtonVariantProps["size"]>;

const meta = {
  component: Button,
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      // ハードコーディングせずに型から抽出した値を使用
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ] satisfies ButtonVariants[],
      size: {
        control: "select",
        options: ["default", "sm", "lg", "icon"] satisfies ButtonSizes[],
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
