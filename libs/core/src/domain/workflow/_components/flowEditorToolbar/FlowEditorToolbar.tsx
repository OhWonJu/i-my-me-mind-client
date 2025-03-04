"use client";

import {
  Children,
  ElementRef,
  isValidElement,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@imymemind/core/components/ui/accordion";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Settings } from "lucide-react";

import { TaskType } from "@imymemind/core/types/task";
import { cn } from "@imymemind/core/lib/utils";

import {
  ChevronLeft,
  CreditCard,
  Menu,
} from "@imymemind/core/components/icons";

import ToolbarMenuButton from "./ToolbarMenuButton";

const MIN_WIDTH = 80;
const MAX_WIDTH = 300;

interface FlowEditorToolbarProps {
  disabled?: boolean;
  resizeable?: boolean;
  className?: string;
  align?: "left" | "right";
}

export const FlowEditorToolbar = ({
  className,
  align = "left",
  children,
}: PropsWithChildren<FlowEditorToolbarProps>) => {
  const [isResetting, setIsResetting] = useState(true);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const extend = useCallback(() => {
    if (!sidebarRef.current) return;
    if (!isResetting) return;

    setIsResetting(false);

    sidebarRef.current.style.width = `${MAX_WIDTH}px`;
  }, [isResetting]);

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

  const childrenWithPropsWithChildWrapper = Children.toArray(children).map(
    (child, index) => {
      if (isValidElement(child)) {
        return (
          <Accordion
            key={index}
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
              <AccordionContent className="pb-2">{child}</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      return null;
    }
  );

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

            {childrenWithPropsWithChildWrapper}

            {/* <button onClick={extend} className="flex w-full py-4 items-center">
              <div className="flex justify-center items-center min-w-[3rem]">
                <Settings className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div
                className={cn(
                  "items-center truncate",
                  isResetting ? "hidden" : "flex"
                )}
              >
                <span className="font-medium text-sm">설정</span>
              </div>
            </button> */}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </aside>
  );
};
