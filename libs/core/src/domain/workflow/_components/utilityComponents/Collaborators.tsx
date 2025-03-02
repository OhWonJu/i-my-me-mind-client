"use client";

import { Plus } from "lucide-react";

import { Button } from "@imymemind/core/components/ui";

const Collaborators = () => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4].map((_, index) => (
        <CollaboratorCard key={index} />
      ))}
      <Button
        variant="plain"
        onClick={() => null}
        className="grid place-items-center bg-card w-[35px] h-[35px] rounded-full shadow-md"
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
};

const CollaboratorCard = () => {
  return (
    <div className="bg-black border-2 w-[48px] h-[48px] rounded-full -mr-5 shadow-md"></div>
  );
};

export default Collaborators;
