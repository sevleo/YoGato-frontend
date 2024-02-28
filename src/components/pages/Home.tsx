// React
import { useState } from "react";
import { Link } from "react-router-dom";

// DndKit
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "../../Draggable";
import { Droppable } from "../../Droppable";

function Home() {
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
