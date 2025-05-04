import React, { PropsWithChildren } from "react";

import Footer from "@/components/Footer";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full h-full ">
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
