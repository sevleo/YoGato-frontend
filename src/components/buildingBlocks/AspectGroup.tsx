import Aspect from "./Aspect";
import { AspectType } from "./Aspect";

export interface AspectGroupType {
  groupName: string;
  aspects: AspectType[];
}

interface AspectGroupProps {
  groupName: string;
  aspects: AspectType[];
  setIsDragging: (isDragging: boolean) => void;
}

function AspectGroup({ groupName, aspects, setIsDragging }: AspectGroupProps) {
  return (
    <div className=" flex flex-col justify-center text-black">
      <p className="mb-2 mt-5 ">{groupName}</p>
      <div className="grid-cols-aspects grid justify-center gap-5">
        {aspects.map((aspect) => (
          <Aspect
            key={aspect.name}
            name={aspect.name}
            setIsDragging={setIsDragging}
          ></Aspect>
        ))}
      </div>
    </div>
  );
}

export default AspectGroup;
