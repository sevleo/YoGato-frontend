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

function Setup({
  flow,
  setFlow,
  aspectGroups,
  setFlowState,
  setLocation,
  enablePreview,
}: SetupProps) {
  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  function handleClearButton() {
    const defaultFlow: FlowType = {
      flowName: "my fancy flow",
      units: [],
      duration: 0,
      uniqueAspects: [],
      uniqueAspectGroups: [],
    };

    setFlow(defaultFlow);
  }

  function handlePreviewButtonClick() {
    if (setFlowState) {
      setFlowState("preview");
      setLocation("preview");
      console.log(location);
    }
  }

  return (
    <div className="setup ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px]">
      <div className="w-3/4">
        <div className="flex flex-col items-start justify-center pb-2 pt-2 text-black">
          <button
            className={`h-full w-[100px] rounded-none border-0 border-b-[5px] border-t-[5px] ${enablePreview ? "over:border-t-[5px] bg-[#143a1e] text-white hover:border-t-white hover:bg-[#143a1e] active:bg-[#9b9b9b2a]" : " bg-[#545454]  text-[#ffffff88] hover:border-t-transparent"}  hover:border-b-transparent  focus:outline-none`}
            onClick={enablePreview ? handlePreviewButtonClick : null}
          >
            Preview
          </button>
          <button
            className=" h-full w-[100px] rounded-none border-0 border-b-[5px] border-t-[5px]  bg-[#143a1e] text-white hover:border-t-[5px] hover:border-b-transparent hover:border-t-white hover:bg-[#143a1e] focus:outline-none active:bg-[#9b9b9b2a]"
            onClick={handleClearButton}
          >
            Clear
          </button>
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
