import { SetStateAction } from "react";
import Unit from "./Unit";
import { UnitProps } from "./Unit";
import { Dispatch } from "react";
import { useDroppable } from "@dnd-kit/core";

interface FlowProps {
  flow: {
    flowName: string;
    units: UnitProps[];
  };
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitProps[];
    }>
  >;
}

function Flow({ flow, setFlow }: FlowProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "flow",
  });

  const style = {
    // width: "100%",
    // height: "100%",
    border: isOver ? "2px solid gold" : "2px solid black",
  };

  function handleButtonClick() {
    const newUnit = {
      name: "new unit",
      sanskritName: "sanskrit name of unit 1",
      duration: 5,
      announcement: "fancy announcement",
    };
    console.log(newUnit);
    setFlow((prevFlow) => {
      return {
        ...prevFlow,
        units: [...prevFlow.units, newUnit],
      };
    });
  }

  return (
    <div className={`h-auto p-5`}>
      <div className="h-full border" ref={setNodeRef} style={style}>
        <div>{flow.flowName}</div>
        <div>
          <button onClick={handleButtonClick}>Create new unit</button>
        </div>
        <div className=" flex flex-col gap-5 bg-slate-400">
          {flow.units.map((unit) => (
            <Unit key={unit.name} {...unit}></Unit>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flow;
