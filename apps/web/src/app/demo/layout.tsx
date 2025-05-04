import { PropsWithChildren } from "react";

const DemoPageLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-screen h-screen">{children}</div>;
};

export default DemoPageLayout;
