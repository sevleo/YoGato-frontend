import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function DraggableItem({ item, sortable = false }) {
  if (sortable) {
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
  } else {
    {
      const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
      });

      const style = {
        transform: CSS.Translate.toString(transform),
      };

      const { isOver, setNodeRef: droppableRef } = useDroppable({
        id: `droppable-${item.id}`,
      });

      return (
        <div
          className="mb-2 bg-white text-black"
          ref={(node) => {
            setNodeRef(node);
            droppableRef(node);
          }}
          style={style}
          {...attributes}
          {...listeners}
        >
          {item.name}
        </div>
      );
    }
  }
}
