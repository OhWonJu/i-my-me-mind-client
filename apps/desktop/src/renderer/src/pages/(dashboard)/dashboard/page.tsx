import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { workflowsQueryKeys } from "@imymemind/core/types/api/workflow";

import { createWorkflow } from "@renderer/api/worflow/ipc";

import { Button } from "@imymemind/core/components/ui";

const DashboardPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: create } = useMutation({
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
      <div className="flex flex-col w-full h-full justify-center items-center">
        Dashborad
        <Button variant="flat" onClick={() => create()}>
          Create new workflow
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
