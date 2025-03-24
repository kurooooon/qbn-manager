import { DefaultBodyType, HttpResponse, PathParams } from "msw";
import { mwsGet } from "../utils";

export const facilitatorsGetHandler = (response: HttpResponse) => {
  return mwsGet<PathParams, DefaultBodyType>("/mock/facilitators", () => {
    return response;
  });
};
