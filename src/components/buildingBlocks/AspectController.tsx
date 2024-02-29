// React
import { HTMLAttributes } from "react";

// DndKit
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// Components
import Aspect from "./AspectDisplay";

export interface AspectType {
  name: string;
}

type Props = {
  aspect: AspectType;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({ aspect }: Props) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: aspect.name,
  });

  return (
    <Aspect
      aspect={aspect}
      ref={setNodeRef}
      isOpacityEnabled={isDragging}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
}
