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
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const dataList = [
  {
    name: "テスト01",
    loginId: "test01",
  },
  {
    name: "テスト02",
    loginId: "test02",
  },
];

export const Default: Story = {
  render: () => (
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
  ),
};
