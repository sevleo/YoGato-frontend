// React
import { SetStateAction, useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";

// DndKit
import { DndContext, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
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

// Components
import Unit from "./Unit";

// Types & interfaces
import { UnitProps } from "./Unit";

interface FlowProps {
  flow: {
    flowName: string;
    units: UnitProps[];
    duration: number;
  };
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitProps[];
      duration: number;
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
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

  const [startFlow, setStartFlow] = useState<boolean>(false);
  const [flowCount, setFlowCount] = useState<number>(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(0);

  // Flowing :)
  useEffect(() => {
    let id;
    if (startFlow) {
      id = setInterval(() => {
        setUnitCount((unitCount) => {
          // console.log(`Unit count: ${unitCount + 1}`);

          if (unitCount + 1 === flow.units[currentUnitIndex].duration) {
            console.log(flow.units[currentUnitIndex].announcement);

            setUnitCount(0);
            setCurrentUnitIndex(currentUnitIndex + 1);

            return;
          } else {
            return unitCount + 1;
          }
        });

        setFlowCount((flowCount) => {
          console.log(`Total count: ${flowCount + 1}`);

          if (flowCount + 1 === flow.duration) {
            setFlowCount(0);
            setStartFlow(false);
            console.log(`Count active: ${!startFlow}`);
            return;
          } else {
            return flowCount + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(id);
  }, [startFlow, flow, currentUnitIndex]);

  // Triggers flow start
  function onButtonClick() {
    setStartFlow(!startFlow);
    console.log(`Count active: ${!startFlow}`);
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
        <button onClick={onButtonClick}>Start</button>
        <div className="droppable-area " ref={setNodeRef} style={{ ...style }}>
          <div className=" flex flex-col bg-slate-400">
            <SortableContext
              items={flow.units}
              strategy={verticalListSortingStrategy}
            >
              {flow.units.map((unit, index) => {
                return (
                  <div key={unit.id}>
                    <Unit {...unit} index={index} setFlow={setFlow}></Unit>
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
