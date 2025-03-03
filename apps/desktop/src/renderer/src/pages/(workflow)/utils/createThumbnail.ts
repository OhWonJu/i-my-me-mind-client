import { getViewportForBounds } from "@xyflow/react";
import { toPng } from "html-to-image";

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = (IMAGE_WIDTH / 16) * 9; // 281.25

export const createThumbnail = async (
  getNodes: any,
  getNodesBounds: any
): Promise<File | null> => {
  const flowElement = document.querySelector(
    ".react-flow__viewport"
  ) as HTMLElement;
  if (!flowElement) {
    console.warn("React Flow viewport not found");
    return null;
  }

  try {
    const nodesBounds = getNodesBounds(getNodes());

    const viewport = getViewportForBounds(
      nodesBounds,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      0.2,
      2,
      5
    );

    const dataUrl = await toPng(flowElement, {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      style: {
        width: `${IMAGE_WIDTH}px`,
        height: `${IMAGE_HEIGHT}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
      filter: (node: HTMLElement) => {
        if (node.tagName === "IMG") {
          return false;
        }
        return true;
      },
    });

    const byteCharacters = atob(dataUrl.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    return new File([blob], "thumbnail.png", { type: "image/png" });
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    return null;
  }
};
