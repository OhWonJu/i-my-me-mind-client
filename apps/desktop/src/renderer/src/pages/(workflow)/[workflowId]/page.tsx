import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";

import WorkflowView from "../_components/WorkflowView";

const WorkflowPage = () => {
  const { workflowId } = useParams();

  return (
    <div key={workflowId} className="relative w-full h-full">
      <Suspense>
        <ReactFlowProvider>
          <WorkflowView workflowId={workflowId} />
        </ReactFlowProvider>
      </Suspense>
    </div>
  );
};

export default WorkflowPage;
