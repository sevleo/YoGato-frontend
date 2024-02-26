export interface UnitProps {
  id: string;
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
  index?: number;
}

function Unit({
  name,
  sanskritName,
  duration,
  announcement,
  index,
}: UnitProps) {
  return (
    <div className="flex justify-center gap-5 bg-slate-100 text-black">
      <div className="flex w-1/6 items-center justify-center">
        Step {index != null ? index + 1 : null}
      </div>
      <div className="flex w-1/6 items-center justify-center">
        Picture space
      </div>
      <div className="flex w-4/6 flex-col items-start">
        <p>{name}</p>
        <p>{sanskritName}</p>
        <p>Length: {duration}</p>
        <p>Announce: {announcement}</p>
      </div>
    </div>
  );
}

export default Unit;
