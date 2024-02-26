import AspectGroup from "../buildingBlocks/AspectGroup";
import Flow from "../buildingBlocks/Flow";
import { UnitProps } from "../buildingBlocks/Unit";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { AspectType } from "../buildingBlocks/AspectController";
import Aspect from "../buildingBlocks/AspectDisplay";
import { v4 as uuidv4 } from "uuid";

function Builder() {
  const aspectGroups: AspectGroupType[] = [
    {
      groupName: "Group 1",
      aspects: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "E" },
        { name: "F" },
        { name: "G" },
      ],
    },
    {
      groupName: "Group 2",
      aspects: [
        { name: "H" },
        { name: "I" },
        { name: "J" },
        { name: "K" },
        { name: "L" },
        { name: "M" },
        { name: "N" },
      ],
    },
    {
      groupName: "Group 3",
      aspects: [
        { name: "O" },
        { name: "P" },
        { name: "Q" },
        { name: "R" },
        { name: "S" },
        { name: "T" },
        { name: "U" },
      ],
    },
    {
      groupName: "Group 4",
      aspects: [
        { name: "V" },
        { name: "W" },
        { name: "X" },
        { name: "Y" },
        { name: "Z" },
        { name: "AA" },
        { name: "AB" },
      ],
    },
    {
      groupName: "Group 5",
      aspects: [
        { name: "AC" },
        { name: "AD" },
        { name: "AE" },
        { name: "AF" },
        { name: "AG" },
        { name: "AH" },
        { name: "AI" },
      ],
    },
  ];

  interface Flow {
    flowName: string;
    units: UnitProps[];
  }

  const defaultFlow: Flow = {
    flowName: "my fancy flow",
    units: [
      {
        id: uuidv4(),
        name: "unit 1",
        sanskritName: "sanskrit name of unit 1",
        duration: 5,
        announcement: "fancy announcement",
      },
      {
        id: uuidv4(),
        name: "unit 2",
        sanskritName: "sanskrit name of unit 2",
        duration: 2,
        announcement: "fancy announcement",
      },
    ],
  };

  const [flow, setFlow] = useState<Flow>(defaultFlow);

  const [activeItem, setActiveItem] = useState<AspectType>();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const foundAspect = aspectGroups
      .flatMap((group) => group.aspects)
      .find((aspect) => aspect.name === active.id);
    console.log(foundAspect);
    setActiveItem(foundAspect);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (!over) {
      setIsDragging(false);
      return;
    }
    handleButtonClick();
    setIsDragging(false);
  };

  const handleDragCancel = () => {
    console.log("canceled");
    setIsDragging(false);
  };

  function handleButtonClick() {
    const newUnit = {
      id: uuidv4(),
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
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl ">
          <div className="canvas w-1/2 overflow-auto bg-slate-500">
            <Flow flow={flow} setFlow={setFlow} isDragging={isDragging}></Flow>
          </div>

          <div className="flex w-1/2 flex-col justify-start gap-5 overflow-auto bg-slate-300">
            <div className="h-auto gap-5 p-5">
              <div className="border">
                {aspectGroups.map((aspectGroup) => (
                  <AspectGroup
                    key={aspectGroup.groupName}
                    groupName={aspectGroup.groupName}
                    aspects={aspectGroup.aspects}
                  ></AspectGroup>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DragOverlay style={{ transformOrigin: "0 0 " }}>
          {activeItem ? <Aspect aspect={activeItem} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Builder;
