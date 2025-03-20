import logo from "@/assets/images/logo-white.png";
import logo2x from "@/assets/images/logo-white@2x.png";
import logo3x from "@/assets/images/logo-white@3x.png";
import { Icon } from "@/components/ui/icon";
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
      <header className="bg-background-primary text-inverse py-3 px-6">
        <div className="flex items-center justify-between max-w-5xl w-auto mx-auto">
          <div className="flex items-center gap-6">
            <img
              src={logo}
              srcSet={`${logo} 1x, ${logo2x} 2x, ${logo3x} 3x`}
              alt="Qubena manager"
              className="aspect-[276/32]"
            />
            <h1 className="border-1 py-2 px-4 rounded-xs">アカウント管理</h1>
          </div>
          {/* TODO: implement user info */}
          <div className="flex items-center gap-2">
            <Icon className="w-8 h-8" name="circle-person" />
            因幡深雪
          </div>
        </div>
      </header>
      <main className="h-full pt-6">
        <Outlet />
      </main>
    </>
  );
}
