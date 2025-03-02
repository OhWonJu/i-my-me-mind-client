import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
