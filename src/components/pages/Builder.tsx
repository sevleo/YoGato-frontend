import AspectGroup from "../buildingBlocks/AspectGroup";

function Builder() {
  interface AspectGroup {
    groupName: string;
    aspects: Aspect[];
  }

  type Aspect = {
    name: string;
  };

  const aspectGroups: AspectGroup[] = [
    {
      groupName: "Group 1",
      aspects: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "E" },
        { name: "F" },
        { name: "G" },
      ],
    },
    {
      groupName: "Group 2",
      aspects: [
        { name: "H" },
        { name: "I" },
        { name: "J" },
        { name: "K" },
        { name: "L" },
        { name: "M" },
        { name: "N" },
      ],
    },
    {
      groupName: "Group 3",
      aspects: [
        { name: "O" },
        { name: "P" },
        { name: "Q" },
        { name: "R" },
        { name: "S" },
        { name: "T" },
        { name: "U" },
      ],
    },
    {
      groupName: "Group 4",
      aspects: [
        { name: "V" },
        { name: "W" },
        { name: "X" },
        { name: "Y" },
        { name: "Z" },
        { name: "AA" },
        { name: "AB" },
      ],
    },
    {
      groupName: "Group 5",
      aspects: [
        { name: "AC" },
        { name: "AD" },
        { name: "AE" },
        { name: "AF" },
        { name: "AG" },
        { name: "AH" },
        { name: "AI" },
      ],
    },
  ];

  return (
    <>
      <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl">
        <div className="canvas w-1/2 bg-slate-500"></div>
        <div className="flex w-1/2 flex-col justify-start gap-5 bg-slate-300 p-5">
          {aspectGroups.map((aspectGroup) => (
            <AspectGroup
              key={aspectGroup.groupName}
              groupName={aspectGroup.groupName}
              aspects={aspectGroup.aspects}
            ></AspectGroup>
          ))}
        </div>
      </div>
    </>
  );
}

export default Builder;
