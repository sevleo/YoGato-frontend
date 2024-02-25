import { useDraggable } from "@dnd-kit/core";

export interface AspectType {
  name: string;
}

interface AspectProps {
  name: string;
}

export default function Aspect({ name }: AspectProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: name,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={name}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      {name}
    </div>
  );
}
