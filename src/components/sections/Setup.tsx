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
  setFlowState: Dispatch<SetStateAction<string>> | undefined;
  aspectGroups: AspectGroupType[];
}

function Setup({ flow, setFlow, aspectGroups }: SetupProps) {
  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return (
    <div className="setup ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px]">
      <div className="w-3/4">
        <div className="flex flex-col items-start justify-center pb-2 pt-2 text-black">
          <div className="flex w-full flex-row items-start justify-center  gap-10 border-b-[0.5px] border-[#7D6A3E] pb-[10px]">
            <div className="flex flex-col items-start justify-center">
              <p className=" font-bold text-white">Duration</p>
              {hours > 0 ? (
                <p className="text-white">{hours} hours</p>
              ) : (
                <p className="text-white">0 hours</p>
              )}
              {minutes > 0 ? (
                <p className="text-white">{minutes} minutes</p>
              ) : (
                <p className="text-white">0 minutes</p>
              )}
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
        <div className="flex gap-10 pt-2">
          <Flow
            flow={flow}
            setFlow={setFlow}
            aspectGroups={aspectGroups}
          ></Flow>
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
