// React
import { useEffect, useState } from "react";

// Components
import Flow from "../buildingBlocks/Flow";
import Header from "../sections/Header";
import AspectCollection from "../buildingBlocks/AspectCollection";

// Types & interfaces
import { UnitType } from "../buildingBlocks/Unit";
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import categories from "../../db/categories.json";

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

      <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl pt-[60px]">
        <div className="rtl scrollbar-gutter canvas w-2/3 overflow-auto pl-[40px] pr-[40px] ">
          <Flow flow={flow} setFlow={setFlow}></Flow>
        </div>
        <div className="h-3/4 w-[0.5px] self-center bg-neutral-300"></div>
        <div className=" scrollbar-gutter flex w-1/3 flex-row justify-start gap-5 overflow-auto pl-[40px] pr-[40px] ">
          <AspectCollection
            aspectGroups={aspectGroups}
            flow={flow}
            setFlow={setFlow}
          ></AspectCollection>
        </div>
      </div>
    </>
  );
}

export default Builder;
