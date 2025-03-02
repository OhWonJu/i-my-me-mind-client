import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";

import { clearAssets } from "@renderer/api/worflow/ipc";

import WorkflowView from "../_components/WorkflowView";

const WorkflowPage = () => {
  const { workflowId } = useParams();

  // Asset Clearup
  useEffect(() => {
    const requestedAssets = new Set<string>();

    // 이미지 태그로부터 url 수집
    const collectExistingImages = () => {
      // document.querySelectorAll("img").forEach(img => {
      //   requestedAssets.add(img.src);
      // });
      const workflowPageElement = document.getElementById("workflow-page");
      workflowPageElement.querySelectorAll("img").forEach(img => {
        requestedAssets.add(img.src);
      });
    };

    const handleUnload = () => {
      collectExistingImages();
      const assetList = Array.from(requestedAssets);
      clearAssets(workflowId, assetList);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div id="workflow-page" className="relative w-full h-full">
      <Suspense>
        <WorkflowView workflowId={workflowId} />
      </Suspense>
    </div>
  );
};

export default WorkflowPage;
