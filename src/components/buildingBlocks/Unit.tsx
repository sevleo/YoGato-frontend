// React
import { SetStateAction } from "react";
import { Dispatch } from "react";

// DndKit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Components
import Input from "./Input";

export interface UnitType {
  id: string;
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
  index?: number;
  image: string | undefined;
  aspectId: number;
  url_svg_alt_local: string;
}

interface UnitProps {
  id: string;
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
  index?: number;
  image: string | undefined;
  aspectId: number;
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
}

function Unit({
  id,
  name,
  sanskritName,
  duration,
  announcement,
  index,
  image,
  setFlow,
}: UnitProps) {
  // On delete button on unit
  function onUnitCloseClick() {
    setFlow((prevFlow) => {
      const updatedUnits = prevFlow.units.filter((unit) => unit.id !== id);
      const updatedDuration = updatedUnits.reduce(
        (acc, unit) => acc + unit.duration,
        0
      );
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
        duration: updatedDuration,
        uniqueAspects: uniqueAspects,
      };
    });
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // On changing length on unit
  function handleLengthChange(newLength: number) {
    setFlow((prevFlow) => {
      const updatedUnits = prevFlow.units.map((unit) => {
        if (unit.id === id) {
          return {
            ...unit,
            duration: newLength,
          };
        }
        return unit;
      });
      const updatedDuration = updatedUnits.reduce(
        (acc, unit) => acc + unit.duration,
        0
      );
      return {
        ...prevFlow,
        units: updatedUnits,
        duration: updatedDuration,
      };
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" step relative flex cursor-default justify-center gap-5 bg-slate-100 text-black"
    >
      <div
        className=" absolute right-[10px] top-[10px] z-50 hover:cursor-pointer"
        onClick={onUnitCloseClick}
      >
        <span className="material-symbols-outlined">close</span>
      </div>
      <div
        {...attributes}
        {...listeners}
        className="mb-auto mt-auto flex cursor-pointer items-center justify-center"
      >
        <svg viewBox="0 0 20 20" width="20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </div>
      <div className="flex w-1/6 items-center justify-center">
        Step {index != null ? index + 1 : null}
      </div>
      <div className="flex w-1/6 items-center justify-center">
        <img src={image} alt="" />
      </div>
      <div className="flex w-4/6 flex-col items-start">
        <p>{name}</p>
        <p>{sanskritName}</p>
        <Input
          id={id}
          type="number"
          label="Length:"
          defaultValue={duration}
          onChange={handleLengthChange}
        />
        <p>Announce: {announcement}</p>
      </div>
    </div>
  );
}

export default Unit;
