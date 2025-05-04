"use client";

import React from "react";
import dynamic from "next/dynamic";

const WorkflowComponent = dynamic(() => import("./_components/Workflow"), {
  ssr: false,
});

const DemoPage = () => {
  return <WorkflowComponent />;
};

export default DemoPage;
