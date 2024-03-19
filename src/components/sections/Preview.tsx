import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import mp3Provider from "../../assets/mp3Provider";
import { FlowType } from "./Flow";
import "./Preview.css";
import Wheel from "../buildingBlocks/Wheel";
import CircularProgressBar from "../buildingBlocks/CircularProgressBar/CircularProgressBar";

interface PreviewProps {
  flow: FlowType;
  setFlowState: Dispatch<SetStateAction<string>>;
}

function Preview({ flow, setFlowState }: PreviewProps) {
  const [startFlow, setStartFlow] = useState<boolean>(false);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [flowCount, setFlowCount] = useState<number>(0);
  const [flowPercent, setFlowPercent] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [unitPercent, setUnitPercent] = useState<number>(0);

  const [updateWheel, setUpdateWheel] = useState(false);

  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  // Flowing :)
  useEffect(() => {
    let secondCounter: number;
    let percentCounter: number;
    if (startFlow) {
      secondCounter = setInterval(() => {
        setUnitCount((unitCount: number) => {
          // console.log(`Unit count: ${unitCount + 1}`);
          let newUnitCount: number;

          if (unitCount + 1 === flow.units[currentUnitIndex].duration) {
            if (flow.units[currentUnitIndex + 1]) {
              const audio = new Audio(
                mp3Provider(flow.units[currentUnitIndex + 1].url_svg_alt_local)
              );
              // setTimeout(() => {
              //   audio.play();
              // }, 1000);
              audio.play();
              console.log(flow.units[currentUnitIndex + 1].announcement);
            }
            setCurrentUnitIndex(currentUnitIndex + 1);
            setUpdateWheel(true);
            setUnitPercent(0);
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

      percentCounter = setInterval(() => {
        setFlowPercent((flowPercent) => {
          const increment = 100 / (flow.duration * 100);
          const newFlowPercent: number = Math.min(flowPercent + increment, 100);
          //   console.log(newFlowPercent);
          return newFlowPercent;
        });

        setUnitPercent((unitPercent) => {
          const increment = 100 / (flow.units[currentUnitIndex].duration * 100);
          const newUnitPercent: number = Math.min(unitPercent + increment, 100);
          console.log(newUnitPercent);
          return newUnitPercent;
        });
      }, 10);
    }

    return () => {
      clearInterval(secondCounter);
      clearInterval(percentCounter);
    };
  }, [startFlow, flow, currentUnitIndex, updateWheel]);

  function handleStartButtonClick() {
    setStartFlow(!startFlow);
    setCurrentUnitIndex(0);
    setFlowPercent(0);
    console.log(`Count active: ${!startFlow}`);
    const audio = new Audio(mp3Provider(flow.units[0].url_svg_alt_local));
    audio.play();
    console.log(flow.units[0].announcement);
  }

  function handleCancelButtonClick() {
    setFlowState("setup");
  }

  return (
    <div
      className=" preview ml-auto mr-auto flex w-full max-w-screen-2xl justify-center pt-[20px]"
      style={{ minHeight: "calc(100% - 60px)" }}
    >
      <div className="w-3/4">
        <div className="flex flex-col items-start justify-center pb-2 pt-2 text-black">
          <button className=" text-white" onClick={handleStartButtonClick}>
            Start
          </button>
          <button className=" text-white" onClick={handleCancelButtonClick}>
            Cancel
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
        <div className="canvas flex w-full flex-col items-center pb-[40px] pl-[40px] pr-[40px] pt-[40px]">
          <div className=" grid w-2/3 grid-cols-2">
            <div>
              <div className="">
                <CircularProgressBar
                  percentValue={Math.round(flowPercent)}
                ></CircularProgressBar>
              </div>
            </div>
            <div>
              <div className="">
                <CircularProgressBar
                  percentValue={Math.round(unitPercent)}
                ></CircularProgressBar>
              </div>
            </div>
            <div>
              <p className="ltr flex h-full items-center justify-center p-2">
                Total flow: {flowCount} / {flow.duration} seconds
              </p>
            </div>
            <div>
              <p className="ltr flex h-full items-center justify-center p-2">
                Current pose: {unitCount} /{" "}
                {flow.units[currentUnitIndex]
                  ? flow.units[currentUnitIndex].duration
                  : flow.units[0].duration}{" "}
                seconds
              </p>
            </div>
          </div>
          <br />

          {/* <Wheel
            units={flow.units}
            updateWheel={updateWheel}
            setUpdateWheel={setUpdateWheel}
          ></Wheel> */}
        </div>
      </div>
    </div>
  );
}

export default Preview;
