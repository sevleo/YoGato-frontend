import { ItemTypes } from "../DND/ItemTypes";
import { useDrag } from "react-dnd";

export interface AspectProps {
  name: string;
}

export default function Aspect({ name }: AspectProps) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.ASPECT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      key={name}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      {name}
    </div>
  );
}
