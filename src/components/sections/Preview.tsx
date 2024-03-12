import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import mp3Provider from "../../assets/mp3Provider";
import { FlowType } from "./Flow";
import "./Preview.css";
import Wheel from "../buildingBlocks/Wheel";

interface PreviewProps {
  flow: FlowType;
  setFlowState: Dispatch<SetStateAction<string>>;
}

function Preview({ flow, setFlowState }: PreviewProps) {
  const [startFlow, setStartFlow] = useState<boolean>(false);
  const [, setFlowCount] = useState<number>(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [, setUnitCount] = useState<number>(0);
  const [updateWheel, setUpdateWheel] = useState(false);

  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  // Flowing :)
  useEffect(() => {
    let id: number;
    if (startFlow) {
      id = setInterval(() => {
        setUnitCount((unitCount: number) => {
          // console.log(`Unit count: ${unitCount + 1}`);
          let newUnitCount: number;

          if (unitCount + 1 === flow.units[currentUnitIndex].duration) {
            if (flow.units[currentUnitIndex + 1]) {
              const audio = new Audio(
                mp3Provider(flow.units[currentUnitIndex + 1].url_svg_alt_local)
              );
              setTimeout(() => {
                audio.play();
              }, 1000);
              console.log(flow.units[currentUnitIndex + 1].announcement);
            }
            setCurrentUnitIndex(currentUnitIndex + 1);
            setUpdateWheel(true);
            newUnitCount = 0;
          } else {
            newUnitCount = unitCount + 1;
          }
          return newUnitCount;
        });

        setFlowCount((flowCount: number) => {
          console.log(`Total count: ${flowCount + 1}`);
          let newFlowCount: number;

          if (flowCount + 1 === flow.duration) {
            newFlowCount = 0;
            setStartFlow(false);
            console.log(`End of flow.`);
          } else {
            newFlowCount = flowCount + 1;
          }
          return newFlowCount;
        });
      }, 1000);
    }

    return () => clearInterval(id);
  }, [startFlow, flow, currentUnitIndex, updateWheel]);

  function handleStartButtonClick() {
    setStartFlow(!startFlow);
    setCurrentUnitIndex(0);
    console.log(`Count active: ${!startFlow}`);
    const audio = new Audio(mp3Provider(flow.units[0].url_svg_alt_local));
    audio.play();
    console.log(flow.units[0].announcement);
  }

  function handleCancelButtonClick() {
    setFlowState("setup");
  }

  return (
    <div className="preview flex h-full w-full pt-[60px] text-black">
      <div className="flex w-[200px] flex-col border-b border-l border-t bg-gray-100 p-2">
        <button className=" text-white" onClick={handleStartButtonClick}>
          Start
        </button>
        <div className="mb-2 mt-2 h-[0.5px] w-10/12 self-center bg-neutral-400"></div>
        <button className=" text-white" onClick={handleCancelButtonClick}>
          Cancel
        </button>
        <div className="mb-2 mt-2 h-[0.5px] w-10/12 self-center bg-neutral-400"></div>
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
      </div>

      <Wheel
        units={flow.units}
        updateWheel={updateWheel}
        setUpdateWheel={setUpdateWheel}
      ></Wheel>
    </div>
  );
}

export default Preview;
