"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { ChevronLeft, CreditCard, DotMenu, Menu } from "@/components/icons";
import ToolbarMenuButton from "./ToolbarMenuButton";
import { TaskType } from "@/types/task";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

interface FlowEditorToolbarProps {
  disabled?: boolean;
  resizeable?: boolean;
  className?: string;
  align?: "left" | "right";
}

const MIN_WIDTH = 80;
const MAX_WIDTH = 300;

export const FlowEditorToolbar = ({
  className,
  align = "left",
}: FlowEditorToolbarProps) => {
  const [isResetting, setIsResetting] = useState(true);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const extend = () => {
    if (!sidebarRef.current) return;
    if (!isResetting) return;

    setIsResetting(false);

    sidebarRef.current.style.width = `${MAX_WIDTH}px`;
  };

  const resetWidth = () => {
    if (!sidebarRef.current) return;
    if (isResetting) return;

    setIsResetting(true);

    sidebarRef.current.style.width = `${MIN_WIDTH}px`;
  };

  useEffect(() => {
    if (isResetting) {
      setOpenAccordions([]);
    }
  }, [isResetting]);

  return (
    <aside
      id="flow-editor-tool-bar"
      ref={sidebarRef}
      className={cn(
        "group/sidebar fixed top-0 ml-6 py-8 h-full z-[9999]",
        align === "left" ? "left-0" : "right-0"
      )}
    >
      <div
        className={cn(
          `flex flex-col h-full max-h-full bg-card overflow-hidden shadow-lg border rounded-2xl border-neutral-200/50 dark:border-neutral-700 transition-all ease-in-out transform-gpu duration-300`,
          isResetting ? "w-20" : "w-60",
          "",
          className
        )}
      >
        <section
          id="sidebar-header"
          className="relative flex items-center min-h-[56px] p-4"
        >
          {!isResetting && (
            <button onClick={resetWidth}>
              <ChevronLeft />
            </button>
          )}
        </section>
        <OverlayScrollbarsComponent
          defer
          options={{ scrollbars: { autoHide: "scroll" } }}
        >
          <div className="flex-1 px-4 overflow-hidden overflow-y-auto select-none">
            <Accordion
              type="multiple"
              value={openAccordions}
              onValueChange={setOpenAccordions}
              className="w-full"
              onClick={extend}
            >
              <AccordionItem value="node">
                <AccordionTrigger>
                  <div className="flex">
                    <div className="flex justify-center items-center min-w-[3rem]">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div
                      className={cn(
                        "items-center truncate",
                        isResetting ? "hidden" : "flex"
                      )}
                    >
                      <span className="font-medium text-sm">
                        새 노드 추가하기
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1">
                  <ToolbarMenuButton taskType={TaskType.PLAIN} />
                  <ToolbarMenuButton taskType={TaskType.TODO} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion
              type="multiple"
              value={openAccordions}
              onValueChange={setOpenAccordions}
              className="w-full"
              onClick={extend}
            >
              <AccordionItem value="list">
                <AccordionTrigger>
                  <div className="flex">
                    <div className="flex justify-center items-center min-w-[3rem]">
                      <Menu className="w-6 h-6" />
                    </div>
                    <div
                      className={cn(
                        "items-center truncate",
                        isResetting ? "hidden" : "flex"
                      )}
                    >
                      <span className="font-medium text-sm">목록</span>
                    </div>
                  </div>
                </AccordionTrigger>
                {Array(30)
                  .fill(0)
                  .map((_, index) => (
                    <AccordionContent key={index} className="pb-2">
                      <div className="group select-none flex justify-between items-center hover:bg-card-foreground rounded-md cursor-pointer">
                        <p
                          className="flex-1 truncate pl-3 py-1 cursor-pointer"
                          onClick={() => alert("ITEM")}
                        >
                          adasx adasd
                        </p>
                        <button
                          className="px-3 py-1"
                          onClick={() => alert("ITEM LIST")}
                        >
                          <DotMenu className="hidden group-hover:block w-3 h-3 rotate-90" />
                        </button>
                      </div>
                    </AccordionContent>
                  ))}
              </AccordionItem>
            </Accordion>
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </aside>
  );
};
