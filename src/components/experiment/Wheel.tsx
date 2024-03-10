import { useEffect, useState, useRef, useCallback } from "react";

function Wheel() {
  // default values
  const max = 30;
  const cards = [];

  //   global variables
  let theta = 0;
  let radius = 0;

  const [width, setWidth] = useState(0);
  const wheelRef = useRef(null);

  useEffect(() => {
    // Update the width state when the component mounts or when the wheel element changes
    if (wheelRef.current) {
      setWidth(wheelRef.current.offsetWidth);
    }
    console.log(width);
  }, [width]);

  const change = useCallback(() => {
    console.log("change");
    theta = max ? 360 / max : 1;
    radius = Math.max(100, Math.round(width / 2 / Math.tan(Math.PI / max)));

    const cards = document.querySelectorAll(".wheel .card");
    cards.forEach(function (card, idx) {
      if (idx < max) {
        card.style.opacity = "1";
        card.style.transform = `rotateY(${
          theta * idx
        }deg) translateZ(${radius}px)`;
      } else {
        card.style.opacity = "0";
        card.style.transform = "none";
      }
    });
  }, [max, width]);

  useEffect(() => {
    // Call the change function after the wheel div and its children are created
    change();
  }, [change]); // Empty dependency array ensures this effect runs only once, after the initial render

  function id(idx, max) {
    idx %= max;
    return (idx < 0 ? idx + max : idx).toString().padStart(2, "0");
  }

  function setup() {
    for (let i = 0; i < max; i++) {
      const name = id(i, max);
      cards.push(
        <div key={i} className="card opacity-0" id={"card_" + name}>
          {i}
        </div>
      );
    }

    return (
      <div className="wheel" ref={wheelRef}>
        {cards}
      </div>
    );
  }

  return setup();
}

export default Wheel;
