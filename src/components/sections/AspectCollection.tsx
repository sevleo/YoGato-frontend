import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { FlowType } from "./Flow";
import { Dispatch, SetStateAction } from "react";
import { UnitType } from "../buildingBlocks/Unit";
import { useState } from "react";

interface AspectCollectionProps {
  aspectGroups: AspectGroupType[];
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
}

export default function AspectCollection({
  aspectGroups,
  flow,
  setFlow,
}: AspectCollectionProps) {
  return (
    <div className="flex  w-1/3 flex-col justify-start bg-[#ffffff18]">
      {/* <div>
        <p className="text-black">Poses</p>
      </div> */}
      <div className="h-fit min-h-full w-full gap-5">
        {/* <div className=" border-[1px] border-solid border-neutral-200 p-5"> */}
        <div className="accordion w-full">
          {aspectGroups.map((aspectGroup) => (
            <AspectGroup
              key={aspectGroup.category_name}
              category_name={aspectGroup.category_name}
              poses={aspectGroup.poses}
              uniqueAspects={flow.uniqueAspects}
              setFlow={setFlow}
            ></AspectGroup>
          ))}
        </div>
      </div>
    </div>
  );
}
