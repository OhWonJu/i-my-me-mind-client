import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main className="w-screen h-screen bg-card">
      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default DashboardLayout;
