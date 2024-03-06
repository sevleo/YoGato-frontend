// React
import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import svgProvider from "../../../assets/svgProvider";

// Types & interfaces
import { AspectType } from "./AspectController";

svgProvider("boatstraightlegs");

type Props = {
  aspect: AspectType;
  count: number;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Aspect = forwardRef<HTMLDivElement, Props>(
  ({ aspect, isOpacityEnabled, isDragging, style, count, ...props }, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      //   lineHeight: "0.5",
      // transform: isDragging ? "scale(1.05)" : "scale(1)",
      color: "black",
      maxWidth: "100px",
      ...style,
    };
    // console.log(aspect);

    const svg = svgProvider(aspect.url_svg_alt_local);

    return (
      <div
        ref={ref}
        style={{
          ...styles,
          maxWidth: "100%",
          objectFit: "cover",
        }}
        {...props}
        key={aspect.english_name}
        className=" border-rad relative flex h-[140px] w-[100px] flex-col items-center justify-between rounded-md rounded-md border  border-gray-200 bg-white p-2 shadow-sm"
      >
        <img className=" h-[80px] w-[80px]" src={svg} alt="" />
        <p className=" text-xs">{aspect.english_name}</p>

        {count > 0 && (
          <span className=" absolute right-[3px] top-[3px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white">
            {count}
          </span>
        )}

        {/* <p>{aspect.sanskrit_name_adapted}</p> */}
      </div>
    );
  }
);

export default Aspect;
