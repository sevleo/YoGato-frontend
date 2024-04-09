import React from "react";
import { useContext, useEffect, useState } from "react";
import { FlowType } from "../sections/Flow";

const defaultFlow: FlowType = {
  flowName: "my fancy flow",
  units: [],
  duration: 0,
  uniqueAspects: [],
  uniqueAspectGroups: [],
  flowId: "",
};

interface FlowContextType {
  flow: FlowType;
  setFlow: React.Dispatch<React.SetStateAction<FlowType>>;
  flowState: string;
}

const defaultFlowContext: FlowContextType = {
  flow: defaultFlow,
  setFlow: () => {},
  flowState: "setup",
};

export const FlowDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [flow, setFlow] = useState<FlowType>(defaultFlow);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "c" || event.key === "C") {
        console.log(flow);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [flow]);

  return (
    <FlowContext.Provider value={{ flow, setFlow, flowState: "setup" }}>
      {children}
    </FlowContext.Provider>
  );
};

const FlowContext = React.createContext(defaultFlowContext);

export const useFlow = (): FlowContextType => useContext(FlowContext);
