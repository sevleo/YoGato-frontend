// React
import { SetStateAction, useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";

import mp3Provider from "../../assets/mp3Provider";

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
import { UnitType } from "./Unit";

interface FlowProps {
  flow: {
    flowName: string;
    units: UnitType[];
    duration: number;
    uniqueAspects: {
      id: number;
      count: number;
    }[];
  };
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
  const [, setFlowCount] = useState<number>(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [, setUnitCount] = useState<number>(0);

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
  }, [startFlow, flow, currentUnitIndex]);

  // Triggers flow start
  function onButtonClick() {
    setStartFlow(!startFlow);
    console.log(`Count active: ${!startFlow}`);
    console.log(flow.units[currentUnitIndex].announcement);
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
