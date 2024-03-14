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
  dragAllowed: boolean;
  setDragAllowed: Dispatch<React.SetStateAction<boolean>>;
}

function Unit({
  id,
  name,
  sanskritName,
  duration,
  // announcement,
  index,
  image,
  setFlow,
  dragAllowed,
  setDragAllowed,
}: UnitProps) {
  // On delete button on unit
  function onUnitCloseClick() {
    setFlow((prevFlow) => {
      const updatedUnits = prevFlow.units.filter((unit) => unit.id !== id);
      const updatedDuration = updatedUnits.reduce(
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

  const disableDrag = () => {
    setDragAllowed(false);
  };

  const enableDrag = () => {
    setDragAllowed(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="step relative flex cursor-default  select-none flex-col items-center justify-center rounded-md text-black outline outline-[1px] outline-gray-300 hover:cursor-pointer"
      {...(dragAllowed ? { ...attributes } : null)}
      {...(dragAllowed ? { ...listeners } : null)}
    >
      <div className="flex w-full items-center justify-center rounded-t-md bg-gray-200">
        {index != null ? Number(index + 1) : null}
      </div>
      <div className="main-element flex h-full w-full flex-col justify-between  border-t-[1px] border-gray-300 bg-gray-50 pb-2 pl-2 pr-2  shadow-md">
        <div className="flex flex-col items-center justify-center ">
          <div className="h-full w-full border-b-[1px] pb-2">
            <img className=" rounded-md  pl-2 pr-2  " src={image} alt="" />
          </div>
          <div className="flex w-full flex-col text-xs ">
            <p className="mt-2 w-full text-left text-sm font-semibold">
              {name}
            </p>
            <p className="mb-2 w-full text-wrap text-left">{sanskritName}</p>
          </div>
        </div>

        <div className="mt-auto flex  flex-col gap-2 rounded-b-md border-t-[1px] pt-2">
          <Input
            id={id}
            type="number"
            label=""
            defaultValue={duration}
            onChange={handleLengthChange}
            setDragAllowed={setDragAllowed}
          />
          <div
            className="  hover:cursor-pointer"
            onClick={onUnitCloseClick}
            onMouseEnter={disableDrag}
            onMouseLeave={enableDrag}
          >
            <p className=" mb-0 select-none rounded-md border-[1px] border-red-300 bg-red-100 text-xs hover:border-red-400 hover:bg-red-200 active:border-red-500 active:bg-red-300">
              Remove
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unit;
