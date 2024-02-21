export interface UnitProps {
  name: string;
  sanskritName: string;
  duration: number;
  announcement: string;
}

function Unit({ name, sanskritName, duration, announcement }: UnitProps) {
  return (
    <div className="flex justify-center gap-5">
      <div className="w-1/2">Step 1</div>
      <div className="flex w-1/2 flex-col items-start">
        <p>{name}</p>
        <p>{sanskritName}</p>
        <p>{duration}</p>
        <p>{announcement}</p>
      </div>
    </div>
  );
}

export default Unit;
