// React
import { HTMLAttributes } from "react";

// DndKit
import { useDraggable } from "@dnd-kit/core";

// Components
import Aspect from "./AspectDisplay";

export interface AspectType {
  english_name: string;
  category_name: string;
  sanskrit_name_adapted: string;
  url_svg_alt: string;
}

type Props = {
  aspect: AspectType;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({ aspect }: Props) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: aspect.english_name + aspect.category_name,
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
