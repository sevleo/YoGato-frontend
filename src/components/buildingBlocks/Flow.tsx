// React
import { SetStateAction, useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";

import mp3Provider from "../../assets/mp3Provider";

// DndKit
import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
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
  // verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import Unit from "./Unit";

// Types & interfaces
import { UnitType } from "./Unit";

export interface FlowType {
  flowName: string;
  units: UnitType[];
  duration: number;
  uniqueAspects: {
    id: number;
    count: number;
  }[];
}

interface FlowProps {
  flow: FlowType;
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
  setFlowState: Dispatch<SetStateAction<string>>;
}

function Flow({ flow, setFlow, setFlowState }: FlowProps) {
  const [dragAllowed, setDragAllowed]: [
    boolean,
    Dispatch<React.SetStateAction<boolean>>,
  ] = useState<boolean>(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // activationConstraint: {
      //   delay: 200,
      //   tolerance: 5,
      // },
    }),
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
  function onStartButtonClick() {
    setStartFlow(!startFlow);
    setCurrentUnitIndex(0);
    console.log(`Count active: ${!startFlow}`);
    const audio = new Audio(mp3Provider(flow.units[0].url_svg_alt_local));
    audio.play();
    console.log(flow.units[0].announcement);
  }

  function onPreviewButtonClick() {
    setFlowState("preview");
  }

  return (
    <div className="rtl scrollbar-gutter canvas w-2/3 overflow-auto pl-[40px] pr-[40px] ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToVerticalAxis]}
      >
        <div className="ltr grid h-fit min-h-full">
          <div className="droppable-area  h-fit min-h-full">
            <button className="mb-2 mr-2 mt-5" onClick={onStartButtonClick}>
              Start
            </button>
            <button className="mb-2 ml-2 mt-5" onClick={onPreviewButtonClick}>
              Preview
            </button>
            <div className=" grid auto-rows-fr grid-cols-canvas gap-5">
              <SortableContext
                items={flow.units}
                // strategy={verticalListSortingStrategy}
              >
                {flow.units.map((unit, index) => {
                  return (
                    <Unit
                      key={unit.id}
                      {...unit}
                      index={index}
                      setFlow={setFlow}
                      dragAllowed={dragAllowed}
                      setDragAllowed={setDragAllowed}
                    ></Unit>
                  );
                })}
              </SortableContext>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default Flow;
