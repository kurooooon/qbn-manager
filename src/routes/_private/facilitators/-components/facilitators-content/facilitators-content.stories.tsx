import { generateFacilitator } from "@/mocks/factories/facilitator";
import { facilitatorsGetHandler } from "@/mocks/msw/handlers/facilitatorsHandler";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor, within } from "@storybook/test";
import { HttpResponse } from "msw";
import { FacilitatorsContent } from "./facilitators-content";

const meta = {
  component: FacilitatorsContent,
} satisfies Meta<typeof FacilitatorsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: {
        mockFacilitatorsError: facilitatorsGetHandler(
          HttpResponse.json(
            Array.from({ length: 40 }).map((_, i) =>
              generateFacilitator({
                id: i + 1,
                name: `先生_${i + 1}`,
                loginId: `facilitator_${i + 1}`,
              })
            )
          )
        ),
      },
    },
  },
};

export const APIError: Story = {
  parameters: {
    msw: {
      handlers: {
        mockFacilitatorsError: facilitatorsGetHandler(
          new HttpResponse(null, {
            status: 500,
            statusText: "Internal Server Error",
          })
        ),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.parentElement!);
    await waitFor(() => {
      expect(
        body.getByRole("dialog", { name: "通信エラーが発生しました。" })
      ).toBeVisible();
    });
  },
};
