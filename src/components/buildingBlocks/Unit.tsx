// React
import { SetStateAction, useState } from "react";
import { Dispatch } from "react";

// DndKit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Components
import Input from "./Input";

import { FlowType } from "../sections/Flow";

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
  setFlow: Dispatch<SetStateAction<FlowType>>;

  dragAllowed: boolean;
  setDragAllowed: Dispatch<React.SetStateAction<boolean>>;
}

function Unit({
  id,
  name,
  // sanskritName,
  duration,
  // announcement,
  index,
  image,
  setFlow,
  dragAllowed,
  setDragAllowed,
  aspectGroups,
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
      const uniqueAspectGroups: { groupName: string; count: number }[] = [];

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
        // Save unique aspect group
        aspectGroups.forEach((group) => {
          group.poses.forEach((pose) => {
            if (pose.english_name === unit.name) {
              console.log(pose.category_name);
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
        duration: updatedDuration,
        uniqueAspects: uniqueAspects,
        uniqueAspectGroups: uniqueAspectGroups,
      };
    });
  }

  const [showUnitClose, setShowUnitClose] = useState(false);

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

  const enableUnitClose = () => {
    setShowUnitClose(true);
  };

  const disableUnitClose = () => {
    setShowUnitClose(false);
  };

  return (
    <div
      onMouseEnter={enableUnitClose}
      onMouseLeave={disableUnitClose}
      ref={setNodeRef}
      style={style}
      className="unit step relative flex cursor-default select-none  flex-col items-center justify-center text-black shadow-md hover:cursor-pointer "
      {...(dragAllowed ? { ...attributes } : null)}
      {...(dragAllowed ? { ...listeners } : null)}
    >
      <div
        className="flex max-h-[30px] w-full items-center justify-center bg-[#50422E]"
        onMouseLeave={enableDrag}
      >
        {!showUnitClose ? (
          <div className="flex  w-full items-center justify-center  bg-[#50422E]">
            {index != null ? Number(index + 1) : null}
          </div>
        ) : (
          <div className="  hover:cursor-pointer" onClick={onUnitCloseClick}>
            <p
              onMouseEnter={disableDrag}
              onMouseLeave={enableDrag}
              className=" mb-0 flex select-none items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </p>
          </div>
        )}
      </div>

      <div className="main-element flex h-full w-full flex-col justify-between bg-[#7D6A3E] pb-2 pl-2 pr-2">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex h-full w-full items-center justify-center border-b-[0.5px] border-[#22201E] pb-2">
            <img
              className="  h-3/4 w-3/4 pl-2 pr-2   "
              src={image}
              alt=""
              draggable="false"
            />
          </div>
          <div className="flex w-full flex-col text-xs ">
            <p className="text-xsm mt-2 w-full text-left font-semibold">
              {name}
            </p>
            {/* <p className="mb-2 w-full text-wrap text-left">{sanskritName}</p> */}
          </div>
        </div>

        <div className="mt-auto flex  flex-col gap-2 pt-2">
          <Input
            id={id}
            type="number"
            label=""
            defaultValue={duration}
            onChange={handleLengthChange}
            setDragAllowed={setDragAllowed}
          />
        </div>
      </div>
    </div>
  );
}

export default Unit;
