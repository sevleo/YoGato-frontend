import AspectGroup from "../buildingBlocks/AspectGroup";
import Flow from "../buildingBlocks/Flow";

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

  interface Flow {
    flowName: string;
    units: Unit[];
  }

  type Unit = {
    name: string;
    sanskritName: string;
    duration: number;
    announcement: string;
  };

  const flow: Flow = {
    flowName: "my fancy flow",
    units: [
      {
        name: "unit 1",
        sanskritName: "sanskrit name of unit 1",
        duration: 5,
        announcement: "fancy announcement",
      },
      {
        name: "unit 2",
        sanskritName: "sanskrit name of unit 2",
        duration: 2,
        announcement: "fancy announcement",
      },
      {
        name: "unit 3",
        sanskritName: "sanskrit name of unit 3",
        duration: 8,
        announcement: "fancy announcement",
      },
    ],
  };

  return (
    <>
      <div className="builder ml-auto mr-auto flex h-full w-full max-w-screen-2xl">
        <div className="canvas w-1/2 bg-slate-500">
          <Flow flow={flow}></Flow>
        </div>

        <div className="flex w-1/2 flex-col justify-start gap-5 overflow-auto bg-slate-300">
          <div className="h-auto gap-5 p-5">
            <div className="border">
              {aspectGroups.map((aspectGroup) => (
                <AspectGroup
                  key={aspectGroup.groupName}
                  groupName={aspectGroup.groupName}
                  aspects={aspectGroup.aspects}
                ></AspectGroup>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Builder;
