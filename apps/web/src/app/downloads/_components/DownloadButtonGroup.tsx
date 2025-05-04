"use client";

import React from "react";

import { Button } from "@imymemind/core/components/ui";
import Link from "next/link";
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
