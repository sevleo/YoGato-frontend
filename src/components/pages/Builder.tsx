// React
import { useEffect } from "react";

// Components
import Preview from "../sections/Preview";
import Setup from "../sections/Setup";

// Types & interfaces
import { AspectGroupType } from "../buildingBlocks/AspectGroup";

// Other
import categories from "../../db/categories.json";
import { useFlow } from "../utilities/FlowContext";

function Builder() {
  const aspectGroups: AspectGroupType[] = categories;

  const { flow, flowState } = useFlow();

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
      {flowState === "setup" && (
        <Setup
          aspectGroups={aspectGroups}
          enablePreview={flow.units.length > 0 ? true : false}
          enableClear={flow.units.length > 0 ? true : false}
        ></Setup>
      )}

      {flowState === "preview" && <Preview></Preview>}

      {flowState === "going" && null}
    </>
  );
}

export default Builder;
