export default function Input({ id, type, label, defaultValue }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} defaultValue={defaultValue} />
    </div>
  );
}
