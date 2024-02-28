import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="mb-2 bg-white text-black"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {item.name}
    </div>
  );
}
