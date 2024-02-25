import { useDraggable } from "@dnd-kit/core";
import { HTMLAttributes } from "react";
import { CSS } from "@dnd-kit/utilities";
import Aspect from "./AspectDisplay";

export interface AspectType {
  name: string;
}

type Props = {
  aspect: AspectType;
} & HTMLAttributes<HTMLDivElement>;

export default function AspectController({ aspect }: Props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useDraggable({
    id: aspect.name,
  });

  const styles = transform
    ? {
        // transform: CSS.Transform.toString(transform),
        // transition: transition || undefined,
      }
    : undefined;

  return (
    <Aspect
      aspect={aspect}
      ref={setNodeRef}
      style={styles}
      isOpacityEnabled={isDragging}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
}
