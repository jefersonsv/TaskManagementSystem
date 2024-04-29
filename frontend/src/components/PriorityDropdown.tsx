import { IKeyValue } from "@/types/IKeyValue";
import BaseDropdown from "./BaseDropdown";

export default function PriorityDropdown({
  placeholder,
  onChange,
  value,
}: {
  placeholder?: string;
  onChange: any;
  value: any;
}) {
  const items: IKeyValue[] = [
    { key: 1, value: "Low" },
    { key: 2, value: "Medium" },
    { key: 3, value: "High" },
  ];

  return (
    <BaseDropdown
      placeholder={placeholder}
      items={items}
      onChange={onChange}
      value={value}
    />
  );
}
