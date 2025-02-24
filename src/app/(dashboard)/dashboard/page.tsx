"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkflow, workflowsQueryKeys } from "@/api/workflows";
import { Button } from "@/components/ui";

const Dashboard = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: async () => await createWorkflow(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: workflowsQueryKeys.getWorkflowList,
      });

      router.push(`/workflow/${data.data.id}`);
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

export default Dashboard;
