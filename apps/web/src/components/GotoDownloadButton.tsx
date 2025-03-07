"use client";

import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@imymemind/core/components/ui/Button";

const GotoDownloadButton = ({ size }: { size?: ButtonProps["size"] }) => {
  const router = useRouter();

  return (
    <Button
      variant="flat"
      size={size}
      onClick={() => router.push("/downloads")}
      useRipple
      className="bg-blue-400"
    >
      무료로 시작하기
    </Button>
  );
};

export default GotoDownloadButton;
