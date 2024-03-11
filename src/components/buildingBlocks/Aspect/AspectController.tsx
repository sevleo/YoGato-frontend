// React
import { HTMLAttributes } from "react";
import { v4 as uuidv4 } from "uuid";
import svgProvider from "../../../assets/svgProvider";
import { Dispatch, SetStateAction } from "react";
import { UnitType } from "../Unit";

// Components
import Aspect from "./AspectDisplay";

export interface AspectType {
  english_name: string;
  category_name: string;
  sanskrit_name_adapted: string;
  url_svg_alt: string;
  url_svg_alt_local: string;
  id: number;
}

type Props = {
  aspect: AspectType;
  count: number;
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitType[];
      duration: number;
      uniqueAspects: {
        id: number;
        count: number;
      }[];
    }>
  >;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({ aspect, count, setFlow }: Props) {
  const handleClick = () => {
    console.log(aspect);
    const newUnit = {
      id: uuidv4(),
      name: aspect.english_name,
      sanskritName: aspect.sanskrit_name_adapted,
      duration: 1,
      announcement: aspect.english_name,
      image: svgProvider(aspect.url_svg_alt_local),
      aspectId: aspect.id,
      url_svg_alt_local: aspect.url_svg_alt_local,
    };

    setFlow((prevFlow) => {
      const updatedUnits = [...prevFlow.units, newUnit];
      const totalDuration = updatedUnits.reduce(
        (acc, unit) => acc + unit.duration,
        0
      );
      // Update aspect count
      const uniqueAspects: { id: number; count: number }[] = [];
      updatedUnits.forEach((unit) => {
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
      });
      return {
        ...prevFlow,
        units: updatedUnits,
        duration: totalDuration,
        uniqueAspects: uniqueAspects,
      };
    });
  };

  return <Aspect aspect={aspect} count={count} handleClick={handleClick} />;
}
