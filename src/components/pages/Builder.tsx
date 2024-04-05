// React
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

// Components
import Preview from "../sections/Preview";
import Setup from "../sections/Setup";

// Types & interfaces
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { FlowType } from "../sections/Flow";

// Other
import categories from "../../db/categories.json";

function Builder() {
  const aspectGroups: AspectGroupType[] = categories;

  const defaultFlow: FlowType = {
    flowName: "my fancy flow",
    units: [],
    duration: 0,
    uniqueAspects: [],
    uniqueAspectGroups: [],
  };

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
    <>
      {flowState === "setup" && (
        <Setup
          flow={flow}
          setFlow={setFlow}
          setFlowState={setFlowState}
          aspectGroups={aspectGroups}
          enablePreview={flow.units.length > 0 ? true : false}
          enableClear={flow.units.length > 0 ? true : false}
        ></Setup>
      )}

      {flowState === "preview" && (
        <Preview flow={flow} setFlowState={setFlowState}></Preview>
      )}

      {flowState === "going" && null}
    </>
  );
}

export default Builder;
