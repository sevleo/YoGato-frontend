import AspectGroup from "./AspectGroup";

export default function AspectCollection({ aspectGroups, flow }) {
  return (
    <>
      <div className="h-fit min-h-full w-full gap-5">
        {/* <div className=" border-[1px] border-solid border-neutral-200 p-5"> */}
        <div className="">
          {aspectGroups.map((aspectGroup) => (
            <AspectGroup
              key={aspectGroup.category_name}
              category_name={aspectGroup.category_name}
              poses={aspectGroup.poses}
              uniqueAspects={flow.uniqueAspects}
            ></AspectGroup>
          ))}
        </div>
      </div>
    </>
  );
}
