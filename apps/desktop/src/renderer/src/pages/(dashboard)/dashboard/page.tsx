import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { workflowsQueryKeys } from "@imymemind/core/types/api/workflow";

import { createWorkflow, getWorkflowList } from "@renderer/api/worflow/ipc";

import { Button } from "@imymemind/core/components/ui";
import WorkflowCard from "../_components/WorkflowCard";

const DashboardPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(getWorkflowList());

  const workflowList = data.data;

  const { mutate: create, isPending } = useMutation({
    mutationFn: async () => await createWorkflow(),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowList,
      });

      navigate(`/workflow/${data.data.id}`);
    },
  });

  return (
    <div className="relative w-full h-full">
      <div className="sticky top-0 flex items-center justify-end h-[80px] mb-8 px-16 border-b bg-card">
        <Button
          variant="flat"
          className="bg-blue-400 text-white h-[48px] px-6 rounded-full shadow-md"
          useRipple
          disabled={isPending}
          onClick={() => create()}
        >
          새 마인드플로우 만들기
        </Button>
      </div>
      <section className="mx-auto max-w-full md:max-w-4xl lg:max-w-7xl grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-8 box-border px-16 pb-16">
        {workflowList.map(workflow => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
