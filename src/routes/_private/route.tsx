import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  component: RouteComponent,
});

/**
 * 認証済みのユーザーのみがアクセスできるルート
 */
function RouteComponent() {
  // TODO: implement auth check
  return (
    <>
      <p>Hello "/_private"!</p>
      <Outlet />
    </>
  );
}
