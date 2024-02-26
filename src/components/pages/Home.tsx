import { Link } from "react-router-dom";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "../../Draggable";
import { Droppable } from "../../Droppable";
import { useState } from "react";

// Imports for sortable
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "../../SortableItem";

function Home() {
  // Sortable implementation
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function sortableHandleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Draggable implementation
  const [isDropped, setIsDropped] = useState(false);

  function draggableHandleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(!isDropped);
    }
  }

  return (
    <>
      <div>Welcome to YoGato</div>
      <br />
      <Link to="/builder">Continue as Guest</Link>
      <br />
      <Link to="/builder">Login</Link>
      <br />
      <br />
      <br />
      <br />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={sortableHandleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
      <br />
      <br />
      <br />
      <br />
      <DndContext onDragEnd={draggableHandleDragEnd}>
        {!isDropped ? (
          <Draggable>Drag me!</Draggable>
        ) : (
          <Droppable>"I'm empty now :( Come back"</Droppable>
        )}
        <br />
        <br />
        {!isDropped ? (
          <Droppable>Here =)</Droppable>
        ) : (
          <Draggable>Drag me back!!</Draggable>
        )}
      </DndContext>
    </>
  );
}

export default Home;
