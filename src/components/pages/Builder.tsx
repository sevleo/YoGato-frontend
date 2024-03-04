// React
import { useEffect, useState } from "react";

// DndKit
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";

// Components
import AspectGroup from "../buildingBlocks/AspectGroup";
import Flow from "../buildingBlocks/Flow";
import Aspect from "../buildingBlocks/Aspect/AspectDisplay";

// Types & interfaces
import { UnitProps } from "../buildingBlocks/Unit";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { AspectType } from "../buildingBlocks/Aspect/AspectController";
import aspects from "../../db/aspects.json";
import categories from "../../db/categories.json";

// Other
import { v4 as uuidv4 } from "uuid";

import svgProvider from "../../assets/svgProvider";

function Builder() {
  const aspectGroups: AspectGroupType[] = categories;

  interface Flow {
    flowName: string;
    units: UnitProps[];
    duration: number;
  }

  const defaultFlow: Flow = {
    flowName: "my fancy flow",
    units: [],
    duration: 0,
  };

  const [flow, setFlow] = useState<Flow>(defaultFlow);
  const [activeItem, setActiveItem] = useState<AspectType>();
  const [isDragging, setIsDragging] = useState(false);
  const [isAddedToFlow, setIsAddedToFlow] = useState(true);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const foundAspect = aspectGroups
      .flatMap((group) => group.poses)
      .find(
        (aspect) => aspect.english_name + aspect.category_name === active.id
      );
    setActiveItem(foundAspect);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    // console.log(over);
    if (!over) {
      setIsAddedToFlow(false);
      setIsDragging(false);
      return;
    }
    updateFlow();
    setIsAddedToFlow(true);
    setIsDragging(false);
  };

  // const handleDragCancel = () => {
  //   console.log("canceled");
  //   setIsDragging(false);
  // };

  function updateFlow() {
    if (activeItem) {
      const newUnit = {
        id: uuidv4(),
        name: activeItem.english_name,
        sanskritName: activeItem.sanskrit_name_adapted,
        duration: 2,
        announcement: activeItem.english_name,
        image: svgProvider(activeItem.url_svg_alt_local),
      };

      setFlow((prevFlow) => {
        const updatedUnits = [...prevFlow.units, newUnit];
        const totalDuration = updatedUnits.reduce(
          (acc, unit) => acc + unit.duration,
          0
        );

        return {
          ...prevFlow,
          units: updatedUnits,
          duration: totalDuration,
        };
      });

      // console.log(flow);
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "c" || event.key === "C") {
        console.log(flow);

        // console.log("UNITS IN FLOW:");
        // flow.units.forEach((unit) => {
        //   console.log(unit);
        // });
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [flow]);

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // onDragCancel={handleDragCancel}
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
                    key={aspectGroup.category_name}
                    category_name={aspectGroup.category_name}
                    poses={aspectGroup.poses}
                  ></AspectGroup>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DragOverlay
          dropAnimation={isAddedToFlow ? null : undefined}
          style={{ transformOrigin: "0 0 " }}
        >
          {activeItem ? <Aspect aspect={activeItem} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Builder;
