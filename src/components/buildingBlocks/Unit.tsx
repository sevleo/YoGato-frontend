import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface UnitProps {
  id: string;
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
  index?: number;
}

function Unit({
  id,
  name,
  sanskritName,
  duration,
  announcement,
  index,
}: UnitProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="step flex justify-center gap-5 bg-slate-100 text-black"
    >
      <div className="flex w-1/6 items-center justify-center">
        Step {index != null ? index + 1 : null}
      </div>
      <div className="flex w-1/6 items-center justify-center">
        Picture space
      </div>
      <div className="flex w-4/6 flex-col items-start">
        <p>{name}</p>
        <p>{sanskritName}</p>
        <p>Length: {duration}</p>
        <p>Announce: {announcement}</p>
      </div>
    </div>
  );
}

export default Unit;
