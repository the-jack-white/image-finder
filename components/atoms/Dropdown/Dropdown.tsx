import { DropdownProps } from "@/types/types";

const Dropdown = ({ options, value, callback }: DropdownProps) => {
  return (
    <select
      className="border border-slate p-2 rounded-lg text-gray focus:outline-0"
      name="topics"
      value={value}
      onChange={(e) => callback(e.target.value)}
    >
      <option value="default" disabled>
        Select your preferred topic
      </option>
      {options.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
