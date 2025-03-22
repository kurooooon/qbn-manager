import {
  QueryClient,
  QueryClientProvider as QueryClientProviderComponent,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo } from "react";

const shouldRetry = (failureCount: number) => {
  // デフォルトでfailureCountが2以上の場合はリトライしない
  if (failureCount >= 2) {
    return false;
  }
  return true;
};

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: shouldRetry,
          },
          mutations: {
            retry: shouldRetry,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProviderComponent client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProviderComponent>
  );
};
