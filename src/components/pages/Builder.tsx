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
import Header from "../sections/Header";
import AspectCollection from "../buildingBlocks/AspectCollection";

// Types & interfaces
import { UnitType } from "../buildingBlocks/Unit";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { AspectType } from "../buildingBlocks/Aspect/AspectController";
import categories from "../../db/categories.json";

// Other
import { v4 as uuidv4 } from "uuid";

import svgProvider from "../../assets/svgProvider";

function Builder() {
  const aspectGroups: AspectGroupType[] = categories;

  interface Flow {
    flowName: string;
    units: UnitType[];
    duration: number;
    uniqueAspects: {
      id: number;
      count: number;
    }[];
  }

  const defaultFlow: Flow = {
    flowName: "my fancy flow",
    units: [],
    duration: 0,
    uniqueAspects: [],
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
        duration: 1,
        announcement: activeItem.english_name,
        image: svgProvider(activeItem.url_svg_alt_local),
        aspectId: activeItem.id,
        url_svg_alt_local: activeItem.url_svg_alt_local,
      };

      setFlow((prevFlow) => {
        const updatedUnits = [...prevFlow.units, newUnit];
        const totalDuration = updatedUnits.reduce(
          (acc, unit) => acc + unit.duration,
          0
        );
        // Update aspect count
        const uniqueAspects: { id: number; count: number }[] = [];
        updatedUnits.forEach((unit) => {
          const matchingAspectIndex = uniqueAspects.findIndex(
            (aspect) => aspect.id === unit.aspectId
          );
          if (matchingAspectIndex !== -1) {
            uniqueAspects[matchingAspectIndex].count += 1;
          } else {
            const uniqueAspect = {
              id: unit.aspectId,
              count: 1,
            };
            uniqueAspects.push(uniqueAspect);
          }
        });

        return {
          ...prevFlow,
          units: updatedUnits,
          duration: totalDuration,
          uniqueAspects: uniqueAspects,
        };
      });
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "c" || event.key === "C") {
        console.log(flow);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [flow]);

  return (
    <>
      <Header />
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // onDragCancel={handleDragCancel}
      >
        <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl pt-[60px]">
          <div className="rtl scrollbar-gutter canvas w-2/3 overflow-auto pl-[40px] pr-[40px] ">
            <Flow flow={flow} setFlow={setFlow} isDragging={isDragging}></Flow>
          </div>
          <div className="h-3/4 w-[0.5px] self-center bg-neutral-300"></div>
          <div className=" scrollbar-gutter flex w-1/3 flex-row justify-start gap-5 overflow-auto pl-[40px] pr-[40px] ">
            <AspectCollection
              aspectGroups={aspectGroups}
              flow={flow}
            ></AspectCollection>
          </div>
        </div>
        <DragOverlay
          dropAnimation={isAddedToFlow ? null : undefined}
          style={{ transformOrigin: "0 0 " }}
        >
          {activeItem ? (
            <Aspect aspect={activeItem} isDragging count={0} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Builder;
