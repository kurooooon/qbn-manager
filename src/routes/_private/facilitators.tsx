import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/facilitators")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/facilitators"!</div>;
}
