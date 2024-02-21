import Unit from "./Unit";

interface FlowProps {
  flow: {
    flowName: string;
    units: {
      name: string;
      sanskritName: string;
      duration: number;
      announcement: string;
    }[];
  };
}

function Flow({ flow }: FlowProps) {
  return (
    <div className="h-full p-5">
      <div className="h-full border">
        <div>{flow.flowName}</div>
        <div className=" bg-slate-400">
          <Unit></Unit>
        </div>
      </div>
    </div>
  );
}

export default Flow;
