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
        className=" border-rad relative flex flex-col items-center justify-between rounded-md border  border-gray-200 bg-white shadow-sm"
      >
        <div className="h-full w-full pb-2">
          <img className=" pl-2 pr-2" src={svg} alt="" />
        </div>
        <p className=" mb-2 mt-2 text-xs">{aspect.english_name}</p>

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
