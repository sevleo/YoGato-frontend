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
    <div className="builder ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px]">
      <div className="w-3/4">
        <button className="" onClick={handlePreviewButtonClick}>
          Preview
        </button>
        <div className="flex flex-col items-start justify-center p-2 text-black">
          <div className="flex w-full flex-row items-start justify-center  gap-10 border-b-[0.5px] border-[#7D6A3E] pb-[10px]">
            <div className="flex flex-col items-start justify-center">
              <p className=" font-bold text-white">Duration</p>
              {hours > 0 ? <p className="text-white">{hours} hours</p> : null}
              {minutes > 0 ? (
                <p className="text-white">{minutes} minutes</p>
              ) : null}
              {seconds > 0 ? (
                <p className="text-white">{seconds} seconds</p>
              ) : (
                <p className="text-white">0 seconds</p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className=" font-bold text-white">Poses</p>
              <p className="text-white">{flow.units.length}</p>
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className=" font-bold text-white">Unique poses</p>
              <p className="text-white">{flow.uniqueAspects.length}</p>
            </div>
          </div>
        </div>
        <div className="flex">
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
      </div>
    </div>
  );
}

export default Setup;
