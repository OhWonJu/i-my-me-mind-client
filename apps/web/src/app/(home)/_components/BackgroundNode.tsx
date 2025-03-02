"use client";

import React, { useEffect, useRef } from "react";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const BackgroundNode = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const mouseMoveEvent = (event: MouseEvent) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const posX = event.clientX;
    const posY = event.clientY;

    // 화면 크기 대비 비율 계산 (0 ~ 1)
    const ratioX = posX / screenWidth;
    const ratioY = posY / screenHeight;

    const maxTilt = 5; // 최대 기울기 각도
    const tiltX = (ratioY - 0.5) * 2 * maxTilt; // Y축 비율로 X축 회전
    const tiltY = (ratioX - 0.5) * -2 * maxTilt; // X축 비율로 Y축 회전

    if (nodeRef.current) {
      nodeRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveEvent);

    return () => window.removeEventListener("mousemove", mouseMoveEvent);
  });

  return (
    <div ref={nodeRef} className="fixed w-[120vw] h-[120vh]">
      <ReactFlow fitView>
        <Background variant={BackgroundVariant.Dots} gap={40} size={2} />
      </ReactFlow>
    </div>
  );
};

export default BackgroundNode;
