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
    <div className="p-5">
      <div>{flow.flowName}</div>
      <div className="droppable-area " ref={setNodeRef} style={{ ...style }}>
        <div className=" flex flex-col gap-5 bg-slate-400">
          {flow.units.map((unit, index) => (
            <Unit key={unit.id} {...unit} index={index}></Unit>
          ))}
          <div className="step-placeholder" style={{ minHeight: "96px" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Flow;
