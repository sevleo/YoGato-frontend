// React
import { HTMLAttributes } from "react";
import { v4 as uuidv4 } from "uuid";
import svgProvider from "../../../assets/svgProvider";
import { AspectGroupType } from "../AspectGroup";
import { useFlow } from "../../utilities/FlowContext";
import { Dispatch, SetStateAction } from "react";

// Components
import AspectDisplay from "./AspectDisplay";

export interface AspectControllerType {
  english_name: string;
  category_name: string;
  sanskrit_name_adapted: string;
  url_svg_alt: string;
  url_svg_alt_local: string;
  id: number;
}

type AspectControllerProps = {
  aspect: AspectControllerType;
  count: number;
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({
  aspect,
  count,
  aspectGroups,
  setEnableSave,
}: AspectControllerProps) {
  const { setFlow } = useFlow();
  const handleClick = () => {
    // console.log(aspect);
    const newUnit = {
      id: uuidv4(),
      name: aspect.english_name,
      sanskritName: aspect.sanskrit_name_adapted,
      duration: 1,
      announcement: aspect.english_name,
      image: svgProvider(aspect.url_svg_alt_local),
      aspectId: aspect.id,
      url_svg_alt_local: aspect.url_svg_alt_local,
      aspectGroup: aspect.category_name,
    };

    setFlow((prevFlow) => {
      const updatedUnits = [...prevFlow.units, newUnit];
      const totalDuration = updatedUnits.reduce(
        (acc, unit) => acc + unit.duration,
        0
      );
      // Update aspect count
      const uniqueAspects: { id: number; count: number }[] = [];
      const uniqueAspectGroups: { groupName: string; count: number }[] = [];

      updatedUnits.forEach((unit) => {
        // Save unique aspect
        const matchingAspectIndex = uniqueAspects.findIndex(
          (aspect) => aspect.id === unit.aspectId
        );
        if (matchingAspectIndex !== -1) {
          uniqueAspects[matchingAspectIndex].count += 1;
        } else {
          const uniqueAspect = {
            id: unit.aspectId,
            count: 1,
          };
          uniqueAspects.push(uniqueAspect);
        }

        // Save unique aspect group
        aspectGroups.forEach((group) => {
          group.poses.forEach((pose) => {
            if (pose.english_name === unit.name) {
              // console.log(pose.category_name);
              const matchingAspectGroupIndex = uniqueAspectGroups.findIndex(
                (aspectGroup) => aspectGroup.groupName === pose.category_name
              );
              if (matchingAspectGroupIndex !== -1) {
                uniqueAspectGroups[matchingAspectGroupIndex].count += 1;
              } else {
                const uniqueAspectGroup = {
                  groupName: pose.category_name,
                  count: 1,
                };
                uniqueAspectGroups.push(uniqueAspectGroup);
              }
            }
          });
        });
      });

      return {
        ...prevFlow,
        units: updatedUnits,
        duration: totalDuration,
        uniqueAspects: uniqueAspects,
        uniqueAspectGroups: uniqueAspectGroups,
      };
    });
    setEnableSave(true);
  };

  return (
    <AspectDisplay aspect={aspect} count={count} handleClick={handleClick} />
  );
}
