export default function Input({ id, type, label, defaultValue, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className="flex flex-row items-start justify-center">
      <label htmlFor={id} className="p-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        defaultValue={defaultValue}
        className=" w-12 border bg-transparent p-1"
        onChange={handleChange}
      />
    </div>
  );
}
