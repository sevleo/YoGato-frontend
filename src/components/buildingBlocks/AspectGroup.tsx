export interface AspectGroupProps {
  groupName: string;
  aspects: Aspect[];
}

export type Aspect = {
  name: string;
};

function AspectGroup({ groupName, aspects }: AspectGroupProps) {
  return (
    <div className=" flex flex-col justify-center text-black">
      <p className="mb-2 mt-5 ">{groupName}</p>
      <div className="grid-cols-aspects grid justify-center gap-5">
        {aspects.map((aspect) => (
          <div
            key={aspect.name}
            className="flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
          >
            {aspect.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AspectGroup;
