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
    console.log("close");
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="step relative flex  cursor-default flex-col items-center justify-center text-black"
    >
      {/* <div
        className=" absolute right-[0px] top-[0px] z-50 hover:cursor-pointer"
        onClick={onUnitCloseClick}
      >
        <span className="material-symbols-outlined">delete</span>
      </div> */}
      {/* <div
        {...attributes}
        {...listeners}
        className="mb-auto mt-auto flex cursor-pointer items-center justify-center"
      >
        <svg viewBox="0 0 20 20" width="20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </div> */}
      <div className="flexitems-center justify-center">
        {index != null ? index + 1 : null}
      </div>
      <div className="flex h-full w-full flex-col justify-between rounded-md border border-gray-300 bg-gray-50 p-2 shadow-md">
        <div
          className="flex flex-col items-center justify-center "
          {...attributes}
          {...listeners}
        >
          <div className="h-full w-full border-b-[1px] pb-2">
            <img
              className=" rounded-md bg-gray-100 p-2 outline outline-1 outline-slate-300 "
              src={image}
              alt=""
            />
          </div>
          <div className="flex w-full flex-col text-xs ">
            <p className="mt-2 w-full text-left text-sm font-semibold">
              {name}
            </p>
            <p className="mb-2 w-full text-wrap text-left">{sanskritName}</p>
          </div>
        </div>

        <div className="mt-auto flex  flex-col rounded-b-md ">
          <Input
            id={id}
            type="number"
            label=""
            defaultValue={duration}
            onChange={handleLengthChange}
          />
          {/* <p>Announce: {announcement}</p> */}
          <div className="  hover:cursor-pointer" onClick={onUnitCloseClick}>
            {/* <span className="material-symbols-outlined">close</span> */}
            {/* <span>delete</span> */}
            <p className=" mt-2 select-none rounded-md border-[1px] border-red-300 bg-red-100 text-xs hover:border-red-400 hover:bg-red-200 active:border-red-500 active:bg-red-300">
              Remove
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unit;
