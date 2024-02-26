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
      ? "2px solid green"
      : isDragging
        ? "2px solid gold"
        : "2px solid black",
  };

  return (
    <div className="p-5">
      <div>{flow.flowName}</div>
      <div className="droppable-area " ref={setNodeRef} style={{ ...style }}>
        <div className=" flex flex-col bg-slate-400">
          {flow.units.map((unit, index) => {
            return (
              <div key={unit.id}>
                <Unit {...unit} index={index}></Unit>
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </div>
            );
          })}
          <div
            className="step-placeholder flex items-center justify-center"
            style={{ minHeight: "96px" }}
          >
            drop here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flow;
