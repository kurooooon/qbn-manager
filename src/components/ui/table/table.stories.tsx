import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  component: Table,
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const dataList = Array.from({ length: 20 }, (_, index) => ({
  name: `テスト${index + 1}`,
  loginId: `test${index + 1}`,
}));

export const Default: Story = {
  render: () => (
    <div className="w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>お名前</TableHead>
            <TableHead>ログインID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataList.map((data) => (
            <TableRow key={data.loginId}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.loginId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
