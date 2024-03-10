import Flow, { FlowType } from "./Flow";
import AspectCollection from "../buildingBlocks/AspectCollection";
import { Dispatch, SetStateAction } from "react";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { UnitType } from "../buildingBlocks/Unit";

interface SetupProps {
  flow: FlowType;
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitType[];
      duration: number;
      uniqueAspects: {
        id: number;
        count: number;
      }[];
    }>
  >;
  setFlowState: Dispatch<SetStateAction<string>>;
  aspectGroups: AspectGroupType[];
}

function Setup({ flow, setFlow, setFlowState, aspectGroups }: SetupProps) {
  return (
    <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl pt-[60px]">
      <Flow flow={flow} setFlow={setFlow} setFlowState={setFlowState}></Flow>
      <div className="h-3/4 w-[0.5px] self-center bg-neutral-300"></div>
      <AspectCollection
        aspectGroups={aspectGroups}
        flow={flow}
        setFlow={setFlow}
      ></AspectCollection>
    </div>
  );
}

export default Setup;
