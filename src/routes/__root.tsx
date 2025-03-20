import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="h-dvh">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
