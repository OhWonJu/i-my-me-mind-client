import { Suspense } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import WorkflowView from "../_components/WorkflowView";

const WorkflowPage = () => {
  return (
    <div id="workflow-page" className="relative w-full h-full">
      <Suspense>
        <ReactFlowProvider>
          <WorkflowView />
        </ReactFlowProvider>
      </Suspense>
    </div>
  );
};

export default WorkflowPage;
