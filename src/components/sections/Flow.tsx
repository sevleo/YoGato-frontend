// React
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useFlow } from "../utilities/FlowContext";
import UnitDisplay from "../buildingBlocks/Unit/UnitDisplay";

// DndKit
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
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
import Unit from "../buildingBlocks/Unit/UnitController";

// Types & interfaces
import { UnitControllerType } from "../buildingBlocks/Unit/UnitController";

export interface FlowDataType {
  flowName: string;
  units: UnitControllerType[];
  duration: number;
  uniqueAspects: {
    id: number;
    count: number;
  }[];
  uniqueAspectGroups: UniqueAspectGroup[];
  flowId: string;
}

export interface UniqueAspectGroup {
  groupName: string;
  count: number;
}

export interface FlowProps {
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}

function Flow({ aspectGroups, setEnableSave, isMobile }: FlowProps) {
  const { flow, setFlow } = useFlow();
  const [dragAllowed, setDragAllowed]: [
    boolean,
    Dispatch<React.SetStateAction<boolean>>,
  ] = useState<boolean>(true);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeUnit, setActiveUnit] = useState<object>({});

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

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    const activeUnit = flow.units.filter(
      (item) => item.id === event.active.id
    )[0];
    setActiveUnit(activeUnit);
  }

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

    setActiveId(null);
    setActiveUnit({});
    setEnableSave(true);
  }

  return (
    <div className="canvas w-full min-[850px]:pb-[24px] ">
      {/* <div>
        <p className="text-black">Your flow</p>
      </div> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="ltr grid h-fit min-h-[300px] rounded-md border-[1px] border-[#323232] bg-[#232323] transition-colors ">
          <div className="droppable-area h-full min-h-full">
            {flow && flow.units.length > 0 ? (
              <div className=" grid auto-rows-fr grid-rows-canvas">
                <SortableContext
                  items={flow.units}
                  strategy={verticalListSortingStrategy}
                >
                  {flow.units.map((unit, index) => {
                    return (
                      <Unit
                        key={unit.id}
                        {...unit}
                        index={index}
                        dragAllowed={dragAllowed}
                        setDragAllowed={setDragAllowed}
                        aspectGroups={aspectGroups}
                        setEnableSave={setEnableSave}
                        activeId={activeId}
                        lastUnit={
                          index + 1 === flow.units.length ? true : false
                        }
                        isMobile={isMobile}
                      ></Unit>
                    );
                  })}
                </SortableContext>
                <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                  {activeId ? (
                    <UnitDisplay
                      id={(activeUnit as UnitControllerType).id}
                      {...activeUnit}
                      isDragging
                    >
                      <p className="touch-none ">
                        <span className="material-symbols-outlined text-[#a0a0a0]">
                          drag_pan
                        </span>
                      </p>
                    </UnitDisplay>
                  ) : null}
                </DragOverlay>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <p className="hidden select-none p-2 text-2xl font-thin italic text-[#a0a0a0] min-[850px]:block">
                  Click on a pose from the right panel to add it to the flow
                </p>
                <p className="block select-none p-2 text-2xl font-thin italic text-[#a0a0a0] min-[850px]:hidden">
                  Click on a pose from the bottom panel to add it to the flow
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
