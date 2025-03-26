import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";

// 環境変数からベースURLを取得
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://us-central1-compass-hr.cloudfunctions.net";

export const mwsGet = <
  P extends PathParams = PathParams,
  R extends DefaultBodyType = DefaultBodyType,
>(
  path: string,
  resolver: ({
    request,
    params,
  }: {
    request: Request;
    params: P;
  }) => HttpResponse | Promise<HttpResponse>
) => {
  return http.get<P, R>(`${API_BASE_URL}${path}`, resolver);
};
