import { useDraggable } from "@dnd-kit/core";
import { HTMLAttributes } from "react";
import Aspect from "./AspectDisplay";
import { CSS } from "@dnd-kit/utilities";

export interface AspectType {
  name: string;
}

type Props = {
  aspect: AspectType;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({ aspect }: Props) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: aspect.name,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Aspect
      aspect={aspect}
      style={style}
      ref={setNodeRef}
      isOpacityEnabled={isDragging}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
}
