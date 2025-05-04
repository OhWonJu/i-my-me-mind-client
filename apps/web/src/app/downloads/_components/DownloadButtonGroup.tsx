"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@imymemind/core/components/ui";
import { useModal } from "@imymemind/core/stores/useModalStore";

interface DownloadButtonGroupProps {
  macDownloadUrl: string;
  windowDownloadUrl: string;
}

const DownloadButtonGroup = ({
  macDownloadUrl,
  windowDownloadUrl,
}: DownloadButtonGroupProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col xs:flex-row gap-y-4 xs:gap-x-4 mt-8">
      {/* MacOS Button */}
      <Button
        variant="flat"
        size="lg"
        useRipple
        bubblingAble
        className="bg-blue-400 hover:bg-blue-500"
      >
        <Link href={macDownloadUrl} target="_blank" rel="noopener noreferrer">
          MacOS
        </Link>
      </Button>

      {/* Windows Button (Disabled) */}
      <Button
        variant="flat"
        size="lg"
        useRipple
        className="bg-blue-400 hover:bg-blue-500"
        onClick={() =>
          onOpen("commonConfirm", {
            commonConfirm: {
              infomation: `Windows 설치 파일은 아직 공증 받지 않았어요.\n설치 시 경고 문구가 출력될 수 있어요.\nI MY ME MIND 는 외부와 어떠한 통신도 하지 않아요.\n그러니 걱정하지 마세요.`,
              confirmAction: () => window.open(windowDownloadUrl, "_blank"),
            },
          })
        }
      >
        Windows
      </Button>
    </div>
  );
};

export default DownloadButtonGroup;
