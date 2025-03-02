import React from "react";
import { Outlet } from "react-router-dom";

import "overlayscrollbars/overlayscrollbars.css";

import ModalProvider from "@imymemind/core/components/providers/ModalProvider";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <div>
      <ModalProvider />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "bg-card text-primary border-border",
        }}
      />
      <Outlet />
    </div>
  );
};

export default RootLayout;
