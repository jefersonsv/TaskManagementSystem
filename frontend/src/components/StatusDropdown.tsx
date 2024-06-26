import { IKeyValue } from "@/types/IKeyValue";
import BaseDropdown from "./BaseDropdown";

export default function StatusDropdown({
  placeholder,
  onChange,
  value,
}: {
  placeholder?: string;
  onChange: any;
  value?: any;
}) {
  const items: IKeyValue[] = [
    { key: 1, value: "Pending" },
    { key: 2, value: "In Progress" },
    { key: 3, value: "Completed" },
    { key: 4, value: "Archived" },
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
