import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useFlow } from "../utilities/FlowContext";
import { Dispatch, SetStateAction } from "react";
import _ from "lodash";
import AspectController from "../buildingBlocks/Aspect/AspectController";

interface AspectCollectionProps {
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
}

export default function AspectCollection({
  aspectGroups,
  setEnableSave,
}: AspectCollectionProps) {
  const { flow } = useFlow();
  const aspects = [];
  aspectGroups.map((aspectGroup) => {
    aspects.push(...aspectGroup.poses);
  });

  const sortedUniqueAspects = _.sortBy(_.uniqBy(aspects, "id"), "english_name");

  return (
    <>
      <div className=" w-full flex-col justify-start rounded-md pb-6 max-[650px]:hidden min-[850px]:flex">
        <div className="h-fit min-h-full w-full gap-5">
          <div className="accordion w-full">
            {aspectGroups.map((aspectGroup) => {
              const aspectGroupCount = flow
                ? (
                    flow.uniqueAspectGroups.find(
                      (uniqueAspectGroup: {
                        groupName: string;
                        count: number;
                      }) =>
                        uniqueAspectGroup?.groupName ===
                        aspectGroup.category_name
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
      <div className="fixed bottom-0 left-0 hidden h-[200px] w-full bg-[#0000ff4b] max-[650px]:flex">
        {sortedUniqueAspects.map((aspect) => {
          return (
            <AspectController
              key={aspect.english_name + aspect.category_name}
              aspect={aspect}
              count={2}
              aspectGroups={aspectGroups}
              setEnableSave={setEnableSave}
            ></AspectController>
          );
        })}
      </div>
    </>
  );
}
