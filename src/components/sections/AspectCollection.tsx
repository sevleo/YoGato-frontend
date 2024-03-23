import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { FlowType } from "./Flow";
import { Dispatch, SetStateAction } from "react";

interface AspectCollectionProps {
  aspectGroups: AspectGroupType[];
  flow: FlowType;
  setFlow: Dispatch<SetStateAction<FlowType>>;
}

export default function AspectCollection({
  aspectGroups,
  flow,
  setFlow,
}: AspectCollectionProps) {
  return (
    <div className="flex w-1/3 flex-col justify-start">
      <div className="h-fit min-h-full w-full gap-5">
        <div className="accordion w-full">
          {aspectGroups.map((aspectGroup) => {
            const aspectGroupCount = (
              flow.uniqueAspectGroups.find(
                (uniqueAspectGroup: { groupName: string; count: number }) =>
                  uniqueAspectGroup?.groupName === aspectGroup.category_name
              ) as { groupName: string; count: number } | undefined
            )?.count;

            return (
              <AspectGroup
                key={aspectGroup.category_name}
                category_name={aspectGroup.category_name}
                poses={aspectGroup.poses}
                uniqueAspects={flow.uniqueAspects}
                setFlow={setFlow}
                aspectGroupCount={aspectGroupCount}
                aspectGroups={aspectGroups}
              ></AspectGroup>
            );
          })}
        </div>
      </div>
    </div>
  );
}
