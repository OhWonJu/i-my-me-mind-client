import React, {
  useImperativeHandle,
  useState,
  createContext,
  useContext,
} from "react";

export type ActiveTooltipType = {
  activeTooltip: number;
  setActiveTooltip: (index: number) => void;
};

export const ActiveTooltipContext = createContext<ActiveTooltipType>({
  activeTooltip: -1,
  setActiveTooltip: () => null,
});

export const useActiveTooltipContext = () => useContext(ActiveTooltipContext);

export default useActiveTooltipContext;

interface ActiveTooltipProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export type ActiveTooltipRef = {
  activeTab: (index: number) => void;
};

export const ActiveTooltipProvider = React.forwardRef<
  unknown,
  ActiveTooltipProviderProps
>(({ children }, ref) => {
  const [activeTooltip, setActiveTooltip] = useState<number>(-1);

  const handleSetActiveTooltip = (index: number) => {
    setActiveTooltip(index);
  };

  useImperativeHandle(ref, () => {
    return {
      changeActiveTooltip(index: number) {
        handleSetActiveTooltip(index);
      },
    };
  }, [ref]);

  return (
    <ActiveTooltipContext.Provider
      value={{
        activeTooltip,
        setActiveTooltip: handleSetActiveTooltip,
      }}
    >
      {children}
    </ActiveTooltipContext.Provider>
  );
});
