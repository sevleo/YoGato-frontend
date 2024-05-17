import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useFlow } from "../utilities/FlowContext";
import { Dispatch, SetStateAction, useState } from "react";
import _ from "lodash";
import AspectController, {
  AspectControllerType,
} from "../buildingBlocks/Aspect/AspectController";

interface AspectCollectionProps {
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
}

export default function AspectCollection({
  aspectGroups,
  setEnableSave,
}: AspectCollectionProps) {
  const { flow } = useFlow();
  const aspects: AspectControllerType[] = [];
  aspectGroups.map((aspectGroup) => {
    aspects.push(...aspectGroup.poses);
  });

  const [view, setView] = useState("category");

  const sortedUniqueAspects = _.sortBy(_.uniqBy(aspects, "id"), "english_name");

  return (
    <>
      <div className=" w-full flex-col justify-start rounded-md pb-6 max-[650px]:hidden min-[850px]:flex">
        <div>
          <div>View</div>
          <div
            onClick={() => {
              setView("category");
            }}
          >
            By Category
          </div>
          <div
            onClick={() => {
              setView("name");
            }}
          >
            By Name
          </div>
          <div>{view}</div>
        </div>
        <div className="h-fit min-h-full w-full gap-5">
          {view === "category" ? (
            <>
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
            </>
          ) : view === "name" ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {sortedUniqueAspects.map((aspect) => {
                  let count = 0;
                  flow.uniqueAspects.some((uniqueAspect) => {
                    if (uniqueAspect.id === aspect.id) {
                      count = uniqueAspect.count;
                    }
                  });
                  return (
                    <AspectController
                      key={aspect.english_name + aspect.category_name}
                      aspect={aspect}
                      count={count}
                      aspectGroups={aspectGroups}
                      setEnableSave={setEnableSave}
                    ></AspectController>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        style={{ boxShadow: "10px 10px 5px 10px rgb(0 0 0 / 75%)" }}
        className="mobile-aspects fixed bottom-0 left-0 z-50 hidden h-[200px] w-full flex-col overflow-auto border-t-[1px] border-[#323232] bg-[#1c1c1c] pl-4 pr-4  max-[650px]:flex"
      >
        <p className="self-start pl-4 pt-4 font-medium text-[#7e7e7e]">
          Select poses:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 pt-4">
          {sortedUniqueAspects.map((aspect) => {
            let count = 0;
            flow.uniqueAspects.some((uniqueAspect) => {
              if (uniqueAspect.id === aspect.id) {
                count = uniqueAspect.count;
              }
            });
            return (
              <AspectController
                key={aspect.english_name + aspect.category_name}
                aspect={aspect}
                count={count}
                aspectGroups={aspectGroups}
                setEnableSave={setEnableSave}
              ></AspectController>
            );
          })}
        </div>
      </div>
    </>
  );
}
