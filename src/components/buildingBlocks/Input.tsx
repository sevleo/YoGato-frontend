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
  return (
    <div className="flex flex-row items-center justify-center">
      <label htmlFor={id} className=" ">
        {label}
      </label>
      <input
        type={type}
        id={id}
        defaultValue={defaultValue}
        className=" w-12 border bg-transparent"
        onChange={handleChange}
      />
    </div>
  );
}
