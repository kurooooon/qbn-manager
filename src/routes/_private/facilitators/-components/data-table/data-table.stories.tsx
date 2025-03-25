import { generateFacilitator } from "@/mocks/factories/facilitatorFactory";
import { type Facilitator } from "@/models/facilitator";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DataTable } from ".";

// サンプルデータの作成
const createFacilitators = (count: number): Facilitator[] => {
  return Array.from({ length: count }, (_, i) =>
    generateFacilitator({
      id: i + 1,
      name: `講師講師講師講師講師講師講師講師講師講師講師講師 ${i + 1}`,
      loginId: `teacher_${i + 1}_teacher_teacher_teacher`,
    })
  );
};

const meta = {
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[800px] p-4 bg-white">
        <Story />
      </div>
    ),
  ],
  args: {
    onSortingChange: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Default: Story = {
  args: {
    data: createFacilitators(20),
    isLoading: false,
    sorting: [],
  },
};

// ローディング状態
export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
    sorting: [],
  },
};

// 空のデータ
export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
    sorting: [],
  },
};

// 多くの行を持つテーブル
export const ManyRows: Story = {
  args: {
    data: createFacilitators(100),
    isLoading: false,
    sorting: [],
    pageSize: 10,
  },
};

// カスタムページボタンサイズ
export const WithCustomPageButtons: Story = {
  args: {
    data: createFacilitators(200),
    isLoading: false,
    sorting: [],
    pageSize: 10,
    pageButtonSize: 7,
  },
};
