import { Outlet } from "react-router-dom";

const WorkflowLayout = () => {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  );
};

export default WorkflowLayout;
