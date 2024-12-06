import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => {
    return (
      <div>
        {/* Outlet will render child routes */}
        <Outlet />
      </div>
    );
  },
}); 