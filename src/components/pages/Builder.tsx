// React
import { useEffect, useState } from "react";

// Components
import Flow from "../buildingBlocks/Flow";
import Header from "../sections/Header";
import AspectCollection from "../buildingBlocks/AspectCollection";

// Types & interfaces
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import categories from "../../db/categories.json";
import { FlowType } from "../buildingBlocks/Flow";

function Builder() {
  const aspectGroups: AspectGroupType[] = categories;

  const defaultFlow: FlowType = {
    flowName: "my fancy flow",
    units: [],
    duration: 0,
    uniqueAspects: [],
  };

  const [flowState, setFlowState] = useState<string>("builder");
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
      <Header />
      {flowState === "builder" && (
        <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl pt-[60px]">
          <Flow
            flow={flow}
            setFlow={setFlow}
            setFlowState={setFlowState}
          ></Flow>
          <div className="h-3/4 w-[0.5px] self-center bg-neutral-300"></div>
          <AspectCollection
            aspectGroups={aspectGroups}
            flow={flow}
            setFlow={setFlow}
          ></AspectCollection>
        </div>
      )}

      {flowState === "preview" && (
        <div className="preview pt-[60px] text-black">preview</div>
      )}

      {flowState === "going" && (
        <div className="pt-[60px] text-black">going</div>
      )}
    </>
  );
}

export default Builder;
