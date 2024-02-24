export interface AspectType {
  name: string;
}

interface AspectProps {
  name: string;
}

export default function Aspect({ name }: AspectProps) {
  return (
    <div
      key={name}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      {name}
    </div>
  );
}
