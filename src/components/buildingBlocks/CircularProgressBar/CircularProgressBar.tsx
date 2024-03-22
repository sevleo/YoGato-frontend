import "./CircularProgressBar.css";
import { useRef, useEffect } from "react";

interface CircularProgressBarProps {
  percentValue: number;
}

export default function CircularProgressBar({
  percentValue,
  value,
}: CircularProgressBarProps) {
  const circularProgressRef = useRef(null);
  const progressValueRef = useRef(null);

  useEffect(() => {
    console.log(circularProgressRef.current);
    console.log(progressValueRef.current);
  }, []);

  return (
    <div className="container">
      <div
        className="circular-progress"
        ref={circularProgressRef}
        style={{
          background: `conic-gradient(red ${percentValue * 3.6}deg, rgb(215, 215, 215) 0deg)`,
        }}
      >
        <div
          className="progress-value h-full w-full bg-[transparent] p-5 text-black"
          ref={progressValueRef}
        >
          <div className="flex h-full w-full flex-col items-center justify-center bg-[transparent]">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
