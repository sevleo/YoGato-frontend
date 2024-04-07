import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useFlow } from "../utilities/FlowContext";

interface AspectCollectionProps {
  aspectGroups: AspectGroupType[];
}

export default function AspectCollection({
  aspectGroups,
}: AspectCollectionProps) {
  const { flow } = useFlow();

  return (
    <div className="flex w-1/3 flex-col justify-start">
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
              ></AspectGroup>
            );
          })}
        </div>
      </div>
    </div>
  );
}
