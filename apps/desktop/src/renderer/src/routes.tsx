import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./RootLayout";
import DashboardLayout from "./pages/(dashboard)/layout";

import HomePage from "./pages/(home)/page";
import DashboardPage from "./pages/(dashboard)/dashboard/page";
import WorkflowLayout from "./pages/(workflow)/layout";
import WorkflowPage from "./pages/(workflow)/[workflowId]/page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
      {
        element: <WorkflowLayout />,
        children: [
          {
            path: "workflow/:workflowId",
            element: <WorkflowPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
