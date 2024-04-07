import React from "react";
import { useContext, useEffect, useState } from "react";
import { FlowType } from "../sections/Flow";

const defaultFlow: FlowType = {
  flowName: "my fancy flow",
  units: [],
  duration: 0,
  uniqueAspects: [],
  uniqueAspectGroups: [],
};

interface FlowContextType {
  flow: FlowType;
  setFlow: React.Dispatch<React.SetStateAction<FlowType>>;
  flowState: string;
  setFlowState: React.Dispatch<React.SetStateAction<string>>;
}

const defaultFlowContext: FlowContextType = {
  flow: defaultFlow,
  setFlow: () => {},
  flowState: "setup",
  setFlowState: () => {},
};

const FlowContext = React.createContext(defaultFlowContext);

export const FlowDataProvider = ({ children }) => {
  const [flowState, setFlowState] = useState<string>("setup");
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
    <FlowContext.Provider value={{ flow, setFlow, flowState, setFlowState }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = (): FlowContextType => useContext(FlowContext);
