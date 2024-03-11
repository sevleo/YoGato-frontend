import { useEffect, useState, useRef, useCallback } from "react";

function Wheel() {
  // Tracks the width of the spinning wheel element
  const [width, setWidth] = useState(0);

  // Tracks the current position of the wheel
  const [current, setCurrent] = useState(0);

  // Stores the angle by which each card should be rotated
  const [theta, setTheta] = useState(0);

  // Represents the distance from the center of the wheel to the cards
  const [radius, setRadius] = useState(0);

  // Representing the rotation speed of the wheel
  const [speed] = useState(1);

  // Maximum number of cards on the wheel
  const [max, setMax] = useState(10);

  // Used to reference the spinning wheel DOM element
  const wheelRef = useRef(null);

  // Used to store the ID of the rotation timer
  const timerRef = useRef(null);

  // generates an ID for a card based on its index and the maximum number of cards
  const id = useCallback(
    (idx, count = max) => {
      idx %= count;
      return (idx < 0 ? idx + count : idx).toString().padStart(2, "0");
    },
    [max]
  );

  // Used to calculate and update the width of the spinning wheel element.
  // This effect runs once after the component is mounted, updating the width state based on the width of the wheelRef DOM element.
  useEffect(() => {
    if (wheelRef.current) {
      setWidth(wheelRef.current.offsetWidth);
    }
  }, []);

  // Used to handle the rotation of the spinning wheel.
  useEffect(() => {
    const wheel = wheelRef.current;
    if (wheel) {
      // Calculates the rotation angle for each card based on the current position and updates the CSS transform property of the wheel element accordingly
      const rotate = () => {
        wheel.style.transform = `translateZ(${-radius}px) rotateX(${-1}deg) rotateY(${
          -theta * current
        }deg)`;

        // Highlights the current card by adding a CSS class after a delay
        const cards = wheel.querySelectorAll(".card");
        cards.forEach((card) => card.classList.remove("current"));
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(
          () => {
            const currentCard = wheel.querySelector(`#card_${id(current)}`);
            if (currentCard) currentCard.classList.add("current");
          },
          0.9 * (speed * 1000)
        );
      };
      rotate();
    }
  }, [current, radius, speed, theta, id]);

  // Calculates the angle between each card (theta) and the distance from the center of the wheel to the cards (radius).
  useEffect(() => {
    const newTheta = max ? 360 / max : 1;
    const newRadius = Math.max(
      100,
      Math.round(width / 2 / Math.tan(Math.PI / max))
    );
    setTheta(newTheta);
    setRadius(newRadius);
  }, [max, width]);

  function handleClick() {
    // setMax((prevMax) => prevMax - 1);
    setCurrent((prevCurrent) => prevCurrent + 1);
  }

  const cards = [];
  for (let i = 0; i < max; i++) {
    const name = id(i, max);
    cards.push(
      <div
        key={i}
        className="card opacity-1"
        id={"card_" + name}
        style={{
          transform: `rotateY(${theta * i}deg) translateZ(${radius}px)`,
        }}
      >
        {i}
      </div>
    );
  }

  return (
    <>
      <button className="mb-[200px]" onClick={handleClick}>
        test
      </button>
      <div className="wheel" ref={wheelRef}>
        {cards}
      </div>
    </>
  );
}

export default Wheel;
