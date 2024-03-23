// React
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

// Components
import Header from "../sections/Header";
import Preview from "../sections/Preview";
import Setup from "../sections/Setup";

// Types & interfaces
import { AspectGroupType } from "../buildingBlocks/AspectGroup";
import categories from "../../db/categories.json";
import { FlowType } from "../sections/Flow";

interface BuilderProps {
  isHamburgerMenu: boolean;
  setIsHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Builder({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}: BuilderProps) {
  const aspectGroups: AspectGroupType[] = categories;

  const defaultFlow: FlowType = {
    flowName: "my fancy flow",
    units: [],
    duration: 0,
    uniqueAspects: [],
    uniqueAspectGroups: [],
  };

  const [flowState, setFlowState] = useState<string>("setup");
  const [flow, setFlow] = useState<FlowType>(defaultFlow);

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
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      {flowState === "setup" && (
        <Setup
          flow={flow}
          setFlow={setFlow}
          setFlowState={setFlowState}
          aspectGroups={aspectGroups}
          setLocation={setLocation}
          enablePreview={flow.units.length > 0 ? true : false}
          enableClear={flow.units.length > 0 ? true : false}
        ></Setup>
      )}

      {flowState === "preview" && (
        <Preview
          flow={flow}
          setFlowState={setFlowState}
          location={location}
          setLocation={setLocation}
        ></Preview>
      )}

      {flowState === "going" && null}
    </>
  );
}

export default Builder;
