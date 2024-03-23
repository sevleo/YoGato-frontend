// React
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useState } from "react";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";

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
import Unit from "../buildingBlocks/Unit";

// Types & interfaces
import { UnitType } from "../buildingBlocks/Unit";

export interface FlowType {
  flowName: string;
  units: UnitType[];
  duration: number;
  uniqueAspects: {
    id: number;
    count: number;
  }[];
  uniqueAspectGroups: { groupName: string; count: number }[];
}

export interface UniqueAspectGroup {
  groupName: string;
  count: number;
}

export interface setFlow {
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitType[];
      duration: number;
      uniqueAspects: {
        id: number;
        count: number;
      }[];
      uniqueAspectGroups: UniqueAspectGroup[];
    }>
  >;
}

export interface FlowProps {
  flow: FlowType;
  setFlow: setFlow;
  aspectGroups: AspectGroupType[];
}

function Flow({ flow, setFlow, aspectGroups }: FlowProps) {
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

  return (
    <div className=" canvas w-2/3  pb-[40px] ">
      {/* <div>
        <p className="text-black">Your flow</p>
      </div> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToVerticalAxis]}
      >
        <div className="ltr grid h-fit min-h-[300px] bg-[#ffffff18] pb-[40px] pl-[40px] pr-[40px] pt-[40px] transition-colors hover:bg-[#ffffff38]">
          <div className="droppable-area h-full min-h-full">
            {flow.units.length > 0 ? (
              <div className=" grid auto-rows-fr grid-cols-canvas gap-10">
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
                        aspectGroups={aspectGroups}
                      ></Unit>
                    );
                  })}
                </SortableContext>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <p className="select-none text-2xl font-thin italic">
                  Click on a pose from the right panel to add it to the flow
                </p>
              </div>
            )}
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default Flow;
