import AspectGroup from "../buildingBlocks/AspectGroup";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import { useFlow } from "../utilities/FlowContext";
import { Dispatch, SetStateAction, useState } from "react";
import _, { update } from "lodash";
import AspectController, {
  AspectControllerType,
} from "../buildingBlocks/Aspect/AspectController";
import { TextField, Autocomplete } from "@mui/material";

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

  const [view, setView] = useState("name");

  const sortedUniqueAspects = _.sortBy(_.uniqBy(aspects, "id"), "english_name");

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];

  const [inputValue, setInputValue] = useState("");

  function updateInputValue(e) {
    setInputValue(e.target.value);
  }

  return (
    <>
      <div className="w-full flex-col justify-start rounded-md pb-6 max-[650px]:hidden min-[850px]:flex">
        <div>
          <Autocomplete
            disablePortal
            id="combo-box"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </div>
        <div>
          <input
            className="text-[red]"
            type="text"
            value={inputValue}
            onChange={updateInputValue}
          />
        </div>
        <div className="mb-2 flex gap-2">
          <div
            onClick={() => {
              setView("name");
            }}
            className={`${view === "name" ? "cursor-default border-[#6ccc93] bg-[#54976f]" : "cursor-pointer border-[#6ccc93] border-transparent bg-[#545454]"} rounded-md border-[1px]  p-1  text-sm font-medium `}
          >
            By Name
          </div>
          <div
            onClick={() => {
              setView("category");
            }}
            className={`${view === "category" ? "cursor-default border-[#6ccc93] bg-[#54976f]" : "cursor-pointer border-[#6ccc93] border-transparent bg-[#545454]"} rounded-md border-[1px]  p-1 text-sm font-medium  `}
          >
            By Category
          </div>
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
              <div className="aspects-grid gap-2">
                {sortedUniqueAspects.map((aspect) => {
                  let count = 0;
                  flow.uniqueAspects.some((uniqueAspect) => {
                    if (uniqueAspect.id === aspect.id) {
                      count = uniqueAspect.count;
                    }
                  });
                  if (
                    _.startsWith(
                      aspect.english_name.toLowerCase(),
                      inputValue.toLowerCase()
                    )
                  ) {
                    return (
                      <div className="h-full w-[100px]">
                        <AspectController
                          key={aspect.english_name + aspect.category_name}
                          aspect={aspect}
                          count={count}
                          aspectGroups={aspectGroups}
                          setEnableSave={setEnableSave}
                        ></AspectController>
                      </div>
                    );
                  }
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
