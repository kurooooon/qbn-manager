import { createFileRoute } from "@tanstack/react-router";
import { FacilitatorsContent } from "./-components/facilitators-content";

export const Route = createFileRoute("/_private/facilitators/")({
  component: FacilitatorsContent,
});
