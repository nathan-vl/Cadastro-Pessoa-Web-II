export default function Selector({
  options,
  optionToString,
  handleChange,
  style,
}) {
  return (
    <select
      style={style}
      onChange={(e) => handleChange(options[e.target.value])}
    >
      {options.map((option, i) => (
        <option key={i} value={i}>
          {optionToString(option)}
        </option>
      ))}
    </select>
  );
}
