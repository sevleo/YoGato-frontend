import AspectController from "./AspectController";
import { AspectType } from "./AspectController";

export interface AspectGroupType {
  groupName: string;
  aspects: AspectType[];
}

interface AspectGroupProps {
  groupName: string;
  aspects: AspectType[];
}

function AspectGroup({ groupName, aspects }: AspectGroupProps) {
  return (
    <div className=" flex flex-col justify-center text-black">
      <p className="mb-2 mt-5 ">{groupName}</p>
      <div className="grid grid-cols-aspects justify-center gap-5">
        {aspects.map((aspect) => (
          <AspectController
            key={aspect.name}
            aspect={aspect}
          ></AspectController>
        ))}
      </div>
    </div>
  );
}

export default AspectGroup;
