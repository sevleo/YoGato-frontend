interface InputProps {
  id: string;
  type: string;
  label: string;
  defaultValue: number;
  onChange: (newLength: number) => void;
}

export default function Input({
  id,
  type,
  label,
  defaultValue,
  onChange,
}: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const spanStyle = "text-xs";

  return (
    <div className="group relative flex flex-row items-center rounded-md bg-slate-100 outline outline-[1px] outline-gray-300 focus-within:outline-slate-400 ">
      <label htmlFor={id} className=" ">
        {label}
      </label>
      <div className="mr-auto select-none rounded-l-md border-r border-gray-300 pb-[2px] pl-[5px] pr-[5px] pt-[2px] text-xs font-normal hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
        -5
      </div>
      <input
        type="text"
        id={id}
        defaultValue={defaultValue}
        className=" w-full bg-transparent p-[2px] text-center text-xs font-normal outline-none focus-within:bg-slate-200 hover:bg-slate-200"
        onChange={handleChange}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <div className="ml-auto select-none rounded-r-md border-l border-gray-300 pb-[2px] pl-[5px] pr-[5px] pt-[2px] text-xs font-normal hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
        +5
      </div>
    </div>
  );
}
