"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";

import useActiveTooltipContext from "../_context/ActiveTooltipContext";

const TOOL_TIP_CONTENT = [
  `사이드바의 [새 노드 추가하기] 하위 요소를 드래그해서\n워크플로우의 원하는 위치에 놓아보세요.\n새 노드가 해당 위치에 추가돼요.`,
  `노드의 에지를 드래그하여 다른 노드의 에지에 연결해 보세요.\n서로 연관 있는 노드를 표시할 수 있어요.`,
  `노드를 클릭하면 툴박스가 나타나요.`,
  `툴박스를 클릭하면 블록을 추가하거나\n노드 복사, 노드 삭제를 할 수 있어요.`,
  `블록의 드래그 버튼을 꾹 눌러보세요.\n블록의 순서를 원하는 대로 바꿀 수 있어요.`,
  `블록의 삭제 버튼을 눌러,\n필요 없는 블록을 지울 수 있어요.`,
  `할 일 노드는 특별한 기능이 있어요!\n일정 배지를 눌러 할 일들의 일정을 설정해 보세요.`,
  `일정이 설정되면 할 일 노드에 디데이가 표시돼요.`,
  `모든 일정을 완료하면 할 일 노드의 배지를 통해\n완료된 할 일 노드를 구분할 수 있어요.`,
  `전체 일정은 상단의 스케줄 버튼을 눌러\n월 단위로 일정의 완료 여부 등을 확인 할 수 있어요.\n일정을 두 번 눌러 해당 노드로 화면을 이동시켜 보세요.`,
];

const Tooltip = () => {
  const { activeTooltip } = useActiveTooltipContext();

  const isActive = activeTooltip >= 0;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="tooltip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute min-w-[350px] bottom-[30%] left-1/2 -translate-x-1/2 z-[999] bg-blue-300/10 backdrop-blur text-blue-500 text-center whitespace-pre-wrap text-clamp-xs px-4 py-2 rounded-xl inline-block"
        >
          {TOOL_TIP_CONTENT[activeTooltip]}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
