// React
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

// DndKit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Components
import Input from "./Input";

import { AspectGroupType } from "./AspectGroup";
import { useFlow } from "../utilities/FlowContext";

import Button from "./Button";

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
  dragAllowed: boolean;
  setDragAllowed: Dispatch<React.SetStateAction<boolean>>;
  aspectGroups: AspectGroupType[];
  setEnableSave: Dispatch<SetStateAction<boolean>>;
}

function Unit({
  id,
  name,
  sanskritName,
  duration,
  // announcement,
  index,
  image,
  dragAllowed,
  setDragAllowed,
  aspectGroups,
  setEnableSave,
}: UnitProps) {
  const { setFlow } = useFlow();
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
    setEnableSave(true);
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
  function handleLengthChange(newValue: number) {
    setFlow((prevFlow) => {
      const updatedUnits = prevFlow.units.map((unit) => {
        if (unit.id === id) {
          return {
            ...unit,
            duration: newValue,
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
    setEnableSave(true);
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
      className="unit step relative grid  h-[60px] cursor-default select-none grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_0.5fr]  items-center justify-between text-black  hover:cursor-pointer"
      {...(dragAllowed ? { ...attributes } : null)}
      {...(dragAllowed ? { ...listeners } : null)}
    >
      <div className=" flex h-[60px] min-w-[50px] items-center justify-center text-sm font-medium text-[#a0a0a0]">
        {index != null ? Number(index + 1) : null}
      </div>

      <div className="flex h-[60px] w-full items-center justify-center">
        <img className="  h-3/4 w-3/4  " src={image} alt="" draggable="false" />
      </div>
      <div className=" flex h-[60px] min-w-[100px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0]">
        <p className="text-xsm w-full pl-4 text-left font-semibold">{name}</p>
      </div>
      <div className=" flex h-[60px] min-w-[100px] flex-col items-center justify-center text-sm font-medium text-[#a0a0a0]">
        <p className="text-xsm w-full pl-4 text-left font-semibold">
          {sanskritName}
        </p>
      </div>
      <div className="main-element flex h-[60px] justify-between">
        <div className="mb-auto mt-auto flex  flex-col gap-2 ">
          <Input
            inputType="unitDurationInput"
            labelValue=""
            labelFor={id}
            defaultValue={duration}
            onChange={handleLengthChange}
            inputId={id}
            setDragAllowed={setDragAllowed}
          />
        </div>
      </div>
      <div
        className="flex max-h-[30px] w-full items-center justify-center "
        onMouseLeave={enableDrag}
      >
        <div
          className=" hover:cursor-pointer"
          onClick={onUnitCloseClick}
          onMouseEnter={disableDrag}
          onMouseLeave={enableDrag}
        >
          <Button componentType="unitDelete" enabled={true}>
            <p className=" mb-0 flex select-none items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#a0a0a0]">
                delete
              </span>
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Unit;
