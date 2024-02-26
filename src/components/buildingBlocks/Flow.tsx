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
  isDragging: boolean;
}

function Flow({ flow, isDragging }: FlowProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "flow",
  });

  const style = {
    border: isOver
      ? "2px solid gold"
      : isDragging
        ? "2px solid green"
        : "2px solid black",
  };

  return (
    <div className={`h-auto p-5`}>
      <div className="h-full" ref={setNodeRef} style={style}>
        <div>{flow.flowName}</div>

        <div className=" flex flex-col gap-5 bg-slate-400">
          {flow.units.map((unit, index) => (
            <Unit key={unit.name} {...unit} index={index}></Unit>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flow;
