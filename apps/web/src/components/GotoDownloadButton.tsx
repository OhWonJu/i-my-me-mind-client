"use client";

import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@imymemind/core/components/ui/Button";

const GotoDownloadButton = ({ size }: { size?: ButtonProps["size"] }) => {
  const router = useRouter();

  return (
    <div className="relative">
      <Button
        variant="flat"
        size={size}
        onClick={() => router.push("/downloads")}
        useRipple
        className="bg-blue-400 hover:bg-blue-500"
      >
        무료로 시작하기
      </Button>
      <BetaBadge />
    </div>
  );
};

const BetaBadge = () => {
  return (
    <span className="absolute -bottom-[0.6rem] -right-[0.9rem] py-1 px-2 rounded-xl text-xs font-bold bg-primary text-secondary">
      Beta
    </span>
  );
};

export default GotoDownloadButton;
