import Unit from "./Unit";
import { UnitProps } from "./Unit";

interface FlowProps {
  flow: {
    flowName: string;
    units: UnitProps[];
  };
}

function Flow({ flow }: FlowProps) {
  return (
    <div className="h-full p-5">
      <div className="h-full border">
        <div>{flow.flowName}</div>
        <div className=" bg-slate-400">
          {flow.units.map((unit) => (
            <Unit key={unit.name} {...unit}></Unit>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flow;
