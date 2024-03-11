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
              audio.play();
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

  const duration = flow.duration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return (
    <div className="preview pt-[60px] text-black">
      <button
        className="mb-2 mr-2 mt-5 text-white"
        onClick={handleStartButtonClick}
      >
        Start
      </button>
      <button
        className="mb-2 mr-2 mt-5 text-white"
        onClick={handleCancelButtonClick}
      >
        Cancel
      </button>
      <div>
        <p>Flow summary</p>
        <br />
        <p>
          Duration: {hours} hours, {minutes} minutes, {seconds} seconds
        </p>
        <p>Poses: {flow.units.length}</p>
        <p>Unique poses: {flow.uniqueAspects.length}</p>
        <p>Breakdown of poses:</p>
        <br />
        <div className="flex w-full justify-center">
          {/* {flow.units.map((unit) => (
            <div key={unit.id} className="w-[100px] border">
              <p>{unit.name}</p>
              <p>{unit.sanskritName}</p>
            </div>
          ))} */}
        </div>
      </div>
      <div id="container">
        <Wheel
          units={flow.units}
          updateWheel={updateWheel}
          setUpdateWheel={setUpdateWheel}
        ></Wheel>
      </div>
    </div>
  );
}

export default Preview;
