import "./CircularProgressBar.css";
import { useRef, useEffect, ReactNode } from "react";

interface CircularProgressBarProps {
  percentValue: number;
  value: ReactNode;
}

export default function CircularProgressBar({
  percentValue,
  value,
}: CircularProgressBarProps) {
  const circularProgressRef = useRef(null);
  const progressValueRef = useRef(null);

  useEffect(() => {
    // console.log(circularProgressRef.current);
    // console.log(progressValueRef.current);
  }, []);

  return (
    <div className="container min-[820px]:pl-6 min-[820px]:pt-0">
      <div
        className="circular-progress"
        ref={circularProgressRef}
        style={{
          background: `conic-gradient(#6ccc93 ${percentValue * 3.6}deg, #545454 0deg)`,
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
