import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";

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
  return http.get<P, R>(
    `${import.meta.env.VITE_API_BASE_URL}${path}`,
    resolver
  );
};
