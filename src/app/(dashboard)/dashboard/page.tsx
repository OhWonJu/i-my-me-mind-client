"use client";

import { createWorkflow } from "@/api/workflows";
import { Button } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const { mutate: create } = useMutation({
    mutationFn: async () => await createWorkflow(),
    onSuccess: (data) => {
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
