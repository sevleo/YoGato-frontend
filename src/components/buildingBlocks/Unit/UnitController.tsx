import { Dispatch, SetStateAction } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AspectGroupType } from "../AspectGroup";
import { useFlow } from "../../utilities/FlowContext";
import UnitDisplay from "./UnitDisplay";

export interface UnitControllerType {
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

interface UnitControllerProps {
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
  activeId: string | null;
  lastUnit: boolean;
}

function UnitController({
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
  lastUnit,
}: UnitControllerProps) {
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

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
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

  return (
    <UnitDisplay
      ref={setNodeRef}
      id={id}
      style={style}
      dragAllowed={dragAllowed}
      index={index}
      image={image}
      name={name}
      sanskritName={sanskritName}
      duration={duration}
      handleLengthChange={handleLengthChange}
      setDragAllowed={setDragAllowed}
      enableDrag={enableDrag}
      onUnitCloseClick={onUnitCloseClick}
      disableDrag={disableDrag}
      withOpacity={isDragging}
      lastUnit={lastUnit}
      // {...attributes}
      // {...listeners}
    >
      <p {...attributes} {...listeners}>
        drag
      </p>
    </UnitDisplay>
  );
}

export default UnitController;
