import Flow, { FlowType } from "./Flow";
import AspectCollection from "./AspectCollection";
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
  function handlePreviewButtonClick() {
    setFlowState("preview");
  }

  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return (
    <div
      className="builder ml-auto mr-auto flex w-full max-w-screen-2xl pt-[60px]"
      // style={{ backgroundColor: "#22201E" }}
    >
      <button className="" onClick={handlePreviewButtonClick}>
        Preview
      </button>
      <div className="flex flex-col items-start justify-center p-2 text-black">
        <div>
          <div className="flex flex-col items-start justify-center">
            <p className=" font-bold">Duration</p>
            {hours > 0 ? <p> - {hours} hours</p> : null}
            {minutes > 0 ? <p> - {minutes} minutes</p> : null}
            {seconds > 0 ? <p> - {seconds} seconds</p> : null}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className=" font-bold">Poses</p>
            <p> - {flow.units.length}</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className=" font-bold">Unique poses</p>
            <p> - {flow.uniqueAspects.length}</p>
          </div>
        </div>
      </div>
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
