import {
  useEffect,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { UnitType } from "./Unit";

interface WheelProps {
  units: UnitType[];
  updateWheel: boolean;
  setUpdateWheel: Dispatch<SetStateAction<boolean>>;
}

function Wheel({ units, updateWheel, setUpdateWheel }: WheelProps) {
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
  const [max] = useState(units.length);

  // Used to reference the spinning wheel DOM element
  const wheelRef = useRef<HTMLDivElement>(null);

  // Used to store the ID of the rotation timer
  const timerRef = useRef<number | null>(null);

  // generates an ID for a card based on its index and the maximum number of cards
  const id = useCallback(
    (idx: number, count = max) => {
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

  // Used to calculate and update the width of the spinning wheel element after resizing.
  useEffect(() => {
    const handleResize = () => {
      if (wheelRef.current) {
        setWidth(wheelRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(
          () => {
            const currentCard = wheel.querySelector(`#card_${id(current)}`);
            if (currentCard) {
              currentCard.classList.add("current");
            }
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

  useEffect(() => {
    if (updateWheel) {
      setCurrent((prevCurrent) => prevCurrent + 1);
      setUpdateWheel(false);
    }
  }, [updateWheel, setUpdateWheel]);

  const cards: JSX.Element[] = [];
  units.forEach((unit, index) => {
    const name = id(index, max);
    cards.push(
      <div
        key={index}
        className=" card opacity-1 flex  h-min w-9/12 select-none flex-col items-center justify-center rounded-md border-[1px] border-gray-300 bg-gray-50 p-2"
        id={"card_" + name}
        style={{
          transform: `rotateY(${theta * index}deg) translateZ(${radius}px)`,
        }}
      >
        <div className="h-fit  w-full  border-b-[1px]">
          <img
            src={unit.image}
            alt=""
            className=" rounded-md pl-2 pr-2"
            draggable="false"
          />
        </div>
        <div className="h-full">
          <p> {unit.name}</p>
          <p> {unit.sanskritName}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="rtl scrollbar-gutter canvas w-full overflow-auto pb-[40px] pl-[40px] pr-[40px] pt-[40px]">
        <div id="container" className="ltr">
          <div className="wheel pt-[200px]" ref={wheelRef}>
            {cards}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wheel;
