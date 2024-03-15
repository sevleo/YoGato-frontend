// React
import { MouseEventHandler } from "react";
import svgProvider from "../../../assets/svgProvider";

// Types & interfaces
import { AspectType } from "./AspectController";

svgProvider("boatstraightlegs");

type Props = {
  aspect: AspectType;
  count: number;
  handleClick: MouseEventHandler<HTMLDivElement>;
};

function Aspect({ aspect, count, handleClick }: Props) {
  const svg = svgProvider(aspect.url_svg_alt_local);

  return (
    <div
      style={{
        maxWidth: "100%",
        objectFit: "cover",
      }}
      key={aspect.english_name}
      className=" fancy-wrapper relative rounded-md transition-all hover:cursor-pointer "
      onClick={handleClick}
    >
      <div className=" fancy-content flex select-none flex-col items-center justify-between bg-white ">
        <div className="h-full w-full pb-2">
          <img className=" pl-2 pr-2" src={svg} alt="" draggable="false" />
        </div>
        <p className=" mb-2 mt-2 text-xs">{aspect.english_name}</p>
        {count > 0 && (
          <span className=" absolute right-[3px] top-[3px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}

export default Aspect;
