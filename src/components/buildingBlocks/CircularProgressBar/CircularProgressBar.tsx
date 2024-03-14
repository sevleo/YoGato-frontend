import "./CircularProgressBar.css";
import { useRef, useEffect } from "react";

export default function CircularProgressBar({ percentValue }) {
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
        <span className="progress-value" ref={progressValueRef}>
          {percentValue}%
        </span>
      </div>
    </div>
  );
}
