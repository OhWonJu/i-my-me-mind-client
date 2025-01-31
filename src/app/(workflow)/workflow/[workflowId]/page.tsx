import WorkFlow from "../../_components/WorkFlow";

const WorkflowPage = () => {
  // TODO workflow 데이터를 서버사이드에서 프리패치 -> FlowEditor 에 전달

  return (
    <div className="relative w-full h-full">
      <WorkFlow />
    </div>
  );
};

export default WorkflowPage;
