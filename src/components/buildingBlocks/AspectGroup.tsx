// Components
import AspectController from "./Aspect/AspectController";

// Types & Interfaces
import { AspectType } from "./Aspect/AspectController";

export interface AspectGroupType {
  category_name: string;
  poses: AspectType[];
}

interface AspectGroupProps {
  category_name: string;
  poses: AspectType[];
}

function AspectGroup({
  category_name,
  poses,
  uniqueAspects,
}: AspectGroupProps) {
  // console.log(uniqueAspects);
  return (
    <div className=" flex flex-col justify-center text-black">
      <p className="mb-2 mt-5 ">{category_name}</p>
      {/* <div className="grid grid-cols-aspects justify-center gap-5"> */}
      <div className="flex flex-row flex-wrap gap-5">
        {poses.map((pose) => {
          let count = 0;
          uniqueAspects.some((uniqueAspect) => {
            if (uniqueAspect.id === pose.id) {
              count = uniqueAspect.count;
            }
          });
          return (
            <AspectController
              key={pose.english_name + pose.category_name}
              aspect={pose}
              count={count}
            ></AspectController>
          );
        })}
      </div>
    </div>
  );
}

export default AspectGroup;
