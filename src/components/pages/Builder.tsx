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

  const [flowState, setFlowState] = useState("builder");

  const defaultFlow: FlowType = {
    flowName: "my fancy flow",
    units: [],
    duration: 0,
    uniqueAspects: [],
  };

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
          <div className="rtl scrollbar-gutter canvas w-2/3 overflow-auto pl-[40px] pr-[40px] ">
            <Flow
              flow={flow}
              setFlow={setFlow}
              setFlowState={setFlowState}
            ></Flow>
          </div>
          <div className="h-3/4 w-[0.5px] self-center bg-neutral-300"></div>
          <div className=" scrollbar-gutter flex w-1/3 flex-row justify-start gap-5 overflow-auto pl-[40px] pr-[40px] ">
            <AspectCollection
              aspectGroups={aspectGroups}
              flow={flow}
              setFlow={setFlow}
            ></AspectCollection>
          </div>
        </div>
      )}

      {flowState === "preview" && (
        <div className="pt-[60px] text-black">preview</div>
      )}

      {flowState === "going" && (
        <div className="pt-[60px] text-black">going</div>
      )}
    </>
  );
}

export default Builder;
