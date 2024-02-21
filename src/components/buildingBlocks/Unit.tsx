export interface UnitProps {
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
}

function Unit({ name, sanskritName, duration, announcement }: UnitProps) {
  return (
    <div className="flex justify-center gap-5 bg-slate-100 text-black">
      <div className="flex w-1/6 items-center justify-center">Step 1</div>
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
