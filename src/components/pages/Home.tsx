// React
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { DraggableItem } from "../DraggableItem";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { useDroppable } from "@dnd-kit/core";

// DndKit

function Home() {
  const [items1, setItems1] = useState([
    {
      id: 1,
      name: "A",
    },
    {
      id: 2,
      name: "B",
    },
    {
      id: 3,
      name: "C",
    },
    {
      id: 4,
      name: "D",
    },
  ]);
  const [items2, setItems2] = useState([
    {
      id: 5,
      name: "E",
    },
    {
      id: 6,
      name: "F",
    },
    {
      id: 7,
      name: "G",
    },
  ]);

  // Modifiers for DndContext
  const [modifiers, setModifiers] = useState([
    restrictToVerticalAxis,
    restrictToParentElement,
    restrictToWindowEdges,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    if (event.active.data.current !== undefined) {
      setModifiers([restrictToVerticalAxis]);
    } else {
      setModifiers([]);
    }
  }

  function handleDragMove(event) {
    // console.log("Drag Move:");
    // console.log(event);
    // if (event.over && )
  }

  function handleDragOver(event) {
    if (
      event.active.data.current === undefined &&
      event.over.data.current !== undefined &&
      event.over.data.current.sortable
    ) {
      console.log("Move!");
      const draggedItem = items2.find((item) => item.id === event.active.id);
      console.log(draggedItem);
      setItems1((prevItems) => [...prevItems, draggedItem]);
      setItems2((prevItems) =>
        prevItems.filter((item) => item.id !== draggedItem.id)
      );
    }
    // Conditional for sortable
    // if (
    //   event.over &&
    //   event.active.data.current !== undefined &&
    //   event.active.data.current.sortable.containerId !==
    //     event.over.data.current.sortable.containerId
    // ) {
    //   if (event.active.data.current.sortable.containerId === "items1") {
    //     const draggedItem = items1.find((item) => item.id === event.active.id);
    //     setItems1((prevItems) =>
    //       prevItems.filter((item) => item.id !== draggedItem.id)
    //     );
    //     setItems2((prevItems) => [...prevItems, draggedItem]);
    //   } else if (event.active.data.current.sortable.containerId === "items2") {
    //     const draggedItem = items2.find((item) => item.id === event.active.id);
    //     setItems2((prevItems) =>
    //       prevItems.filter((item) => item.id !== draggedItem.id)
    //     );
    //     setItems1((prevItems) => [...prevItems, draggedItem]);
    //   }
    // }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log("Drag End:");
    console.log(event);

    // Conditional for draggable
    if (
      event.active.data.current !== undefined &&
      event.over.data.current !== undefined
    ) {
      console.log("ttt");
    }

    // Conditional for sortable
    if (
      event.active.data.current !== undefined &&
      over &&
      active.id !== over.id
    ) {
      if (event.over.data.current.sortable.containerId === "items1") {
        setItems1((items1) => {
          const oldIndex = items1.findIndex((item) => item.id === active.id);
          const newIndex = items1.findIndex((item) => item.id === over.id);

          return arrayMove(items1, oldIndex, newIndex);
        });
      }
    }
  }

  const { isOver, setNodeRef } = useDroppable({
    id: "right-area",
  });

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={modifiers}
        onDragMove={handleDragMove}
      >
        <div className="flex flex-row">
          <div className="ml-auto mr-1 flex min-h-80 w-80 flex-col bg-green-300">
            <SortableContext
              items={items1}
              strategy={verticalListSortingStrategy}
              id="items1"
            >
              {items1.map((item) => {
                return (
                  <DraggableItem key={item.id} item={item} sortable={true} />
                );
              })}
            </SortableContext>
          </div>
          <div className="ml-1 mr-auto flex min-h-80 w-80 flex-col bg-green-300 ">
            {items2.map((item) => {
              return <DraggableItem key={item.id} item={item} />;
            })}
          </div>
        </div>
      </DndContext>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>Welcome to YoGato</div>
      <br />
      <Link to="/builder">Continue as Guest</Link>
      <br />
      <Link to="/builder">Login</Link>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Home;
