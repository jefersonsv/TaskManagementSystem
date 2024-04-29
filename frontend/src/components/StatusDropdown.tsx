import { IKeyValue } from "@/types/IKeyValue";
import BaseDropdown from "./BaseDropdown";

export default function StatusDropdown({
  placeholder,
  onChange,
  value,
  firstEmpty = false,
}: {
  firstEmpty?: boolean;
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

  if (firstEmpty) items.unshift({ key: 0, value: "All Status" });

  return (
    <BaseDropdown
      placeholder={placeholder}
      items={items}
      onChange={onChange}
      value={value}
    />
  );
}
