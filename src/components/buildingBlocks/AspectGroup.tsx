interface AspectGroupProps {
  groupName: string;
  aspects: { name: string }[];
}

function AspectGroup({ groupName }: AspectGroupProps) {
  return (
    <div className=" flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white text-black ">
      {groupName}
    </div>
  );
}

export default AspectGroup;
