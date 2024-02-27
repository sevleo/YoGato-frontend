import { SetStateAction } from "react";
import Unit from "./Unit";
import { UnitProps } from "./Unit";
import { Dispatch } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// DndKit sortable
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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

function Flow({ flow, setFlow, isDragging }: FlowProps) {
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFlow((prevFlow) => {
        const oldIndex = prevFlow.units.findIndex(
          (unit) => unit.id === active.id
        );
        const newIndex = prevFlow.units.findIndex(
          (unit) => unit.id === over.id
        );

        const newUnits = arrayMove(prevFlow.units, oldIndex, newIndex);
        return {
          ...prevFlow,
          units: newUnits,
        };
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="p-5">
        <div>{flow.flowName}</div>
        <div className="droppable-area " ref={setNodeRef} style={{ ...style }}>
          <div className=" flex flex-col bg-slate-400">
            <SortableContext
              items={flow.units}
              strategy={verticalListSortingStrategy}
            >
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
            </SortableContext>
            <div
              className="step-placeholder flex items-center justify-center"
              style={{ minHeight: "96px" }}
            >
              drop here
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default Flow;
