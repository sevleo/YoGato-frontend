import { ItemTypes } from "../DND/ItemTypes";
import { useDrag } from "react-dnd";

export interface AspectType {
  name: string;
}

interface AspectProps {
  name: string;
  setIsDragging: (isDragging: boolean) => void;
}

export default function Aspect({ name, setIsDragging }: AspectProps) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.ASPECT,
    collect: (monitor) => {
      const dragging = !!monitor.isDragging();
      if (dragging) {
        setIsDragging(dragging);
      }
    },
    end: () => {
      setIsDragging(false);
    },
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
