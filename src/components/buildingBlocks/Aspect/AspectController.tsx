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
  url_svg_alt_local: string;
  id: number;
}

type Props = {
  aspect: AspectType;
  count: number;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({ aspect, count }: Props) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: aspect.english_name + aspect.category_name,
  });

  return (
    <Aspect
      aspect={aspect}
      count={count}
      ref={setNodeRef}
      isOpacityEnabled={isDragging}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
}
