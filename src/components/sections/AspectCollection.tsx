import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useFlow } from "../utilities/FlowContext";
import { Dispatch, SetStateAction } from "react";

interface AspectCollectionProps {
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
}

export default function AspectCollection({
  aspectGroups,
  setEnableSave,
}: AspectCollectionProps) {
  const { flow } = useFlow();

  return (
    <div className="hidden w-full  flex-col justify-start rounded-md min-[850px]:flex ">
      <div className="h-fit min-h-full w-full gap-5">
        <div className="accordion w-full">
          {aspectGroups.map((aspectGroup) => {
            const aspectGroupCount = flow
              ? (
                  flow.uniqueAspectGroups.find(
                    (uniqueAspectGroup: { groupName: string; count: number }) =>
                      uniqueAspectGroup?.groupName === aspectGroup.category_name
                  ) as { groupName: string; count: number } | undefined
                )?.count
              : null;

            return (
              <AspectGroup
                key={aspectGroup.category_name}
                category_name={aspectGroup.category_name}
                poses={aspectGroup.poses}
                uniqueAspects={flow ? flow.uniqueAspects : []}
                aspectGroupCount={
                  aspectGroupCount ? aspectGroupCount : undefined
                }
                aspectGroups={aspectGroups}
                setEnableSave={setEnableSave}
              ></AspectGroup>
            );
          })}
        </div>
      </div>
    </div>
  );
}
