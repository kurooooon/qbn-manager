import { type Facilitator } from "@/models/facilitator";

export const generateFacilitator = (
  args?: Partial<Facilitator>
): Facilitator => {
  const facilitator: Facilitator = {
    id: 1,
    name: "ほげ太郎",
    loginId: "facilitator_1",
  };

  return { ...facilitator, ...args };
};
