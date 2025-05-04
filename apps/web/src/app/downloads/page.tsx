import Container from "@/components/Container";
import React from "react";
import DownloadButtonGroup from "./_components/DownloadButtonGroup";
import Link from "next/link";

const getLatestRelease = async () => {
  const res = await fetch(
    "https://api.github.com/repos/OhWonJu/i-my-me-mind-client/releases/latest",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch latest release");
  }

  return res.json();
};

const DownloadsPage = async () => {
  const latestRelease = await getLatestRelease();

  const tagName = latestRelease.tag_name; // e.g., 'v0.0.0'
  const version = tagName.startsWith("v") ? tagName.slice(1) : tagName;

  const releasePageUrl = `https://github.com/OhWonJu/i-my-me-mind-client/releases/tag/${tagName}`;
  const macDownloadUrl = `https://github.com/OhWonJu/i-my-me-mind-client/releases/download/${tagName}/I.MY.ME.MIND-${version}.dmg`;
  const windowDownloadUrl = `https://github.com/OhWonJu/i-my-me-mind-client/releases/download/${tagName}/i_my_me_mind-${version}-setup.exe`;

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen pb-[75px]">
      <h1 className="text-3xl font-semibold mb-4">I MY ME MIND 다운로드</h1>
      <p className="text-gray-600 mb-8">원하는 플랫폼을 선택해 주세요.</p>

      <DownloadButtonGroup
        macDownloadUrl={macDownloadUrl}
        windowDownloadUrl={windowDownloadUrl}
      />

      <p className="mt-4 text-sm text-gray-500">
        최신 버전:{" "}
        <Link
          href={releasePageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700"
        >
          {tagName}
        </Link>
      </p>
    </Container>
  );
};

export default DownloadsPage;
