// React
import { SetStateAction } from "react";
import { Dispatch } from "react";

// DndKit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface UnitProps {
  id: string;
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
  index?: number;
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitProps[];
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
  setFlow,
}: UnitProps) {
  // On delete unit button
  function onUnitCloseClick() {
    setFlow((prevFlow) => {
      return {
        ...prevFlow,
        units: prevFlow.units.filter((unit) => unit.id !== id),
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className=" step relative flex cursor-default justify-center gap-5 bg-slate-100 text-black"
    >
      <div
        className=" absolute right-[10px] top-[10px] z-50 hover:cursor-pointer"
        onClick={onUnitCloseClick}
      >
        <span className="material-symbols-outlined">close</span>
      </div>
      <div
        {...listeners}
        className="mb-auto mt-auto flex cursor-pointer items-center justify-center"
      >
        Drag
      </div>
      <div className="flex w-1/6 items-center justify-center">
        Step {index != null ? index + 1 : null}
      </div>
      <div className="flex w-1/6 items-center justify-center">
        Picture space
      </div>
      <div className="flex w-4/6 flex-col items-start">
        <p>{name}</p>
        <p>{sanskritName}</p>
        <p>Length: {duration}</p>
        <p>Announce: {announcement}</p>
      </div>
    </div>
  );
}

export default Unit;
