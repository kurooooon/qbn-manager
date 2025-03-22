import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import { QueryClientProvider } from "./query-client-provider";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
