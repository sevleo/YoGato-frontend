import { useEffect, useState, useRef, useCallback } from "react";

function Wheel() {
  // default values
  const angle = 1;
  const max = 10;
  const cards = [];

  //   global variables
  let current = 0;
  let theta = 0;
  let radius = 0;
  let timer = null;
  let speed = 1;

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

    const cards2 = document.querySelectorAll(".card");

    cards2.forEach(function (card, idx) {
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

    // Rotate
    let wheel = document.querySelector(".wheel");
    wheel.style.transform = `translateZ(${-radius}px) rotateX(${-angle}deg) rotateY(${
      -theta * current
    }deg)`;

    let cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
      card.classList.remove("current");
    });

    clearTimeout(timer);
    timer = setTimeout(
      function () {
        let currentCard = document.getElementById(`card_${id(current)}`);
        currentCard.classList.add("current");
      },
      0.9 * (speed * 1000)
    );
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
