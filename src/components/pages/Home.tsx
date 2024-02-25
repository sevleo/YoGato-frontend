import { Link } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../../Draggable";
import { Droppable } from "../../Droppable";
import { useState } from "react";

function Home() {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
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
      <DndContext onDragEnd={handleDragEnd}>
        <div>{isDropped.toString()}</div>
        <br />
        <br />
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
