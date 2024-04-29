import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IKeyValue } from "@/types/IKeyValue";

export default function BaseDropdown({
  placeholder,
  items,
  onChange,
  value,
}: {
  placeholder?: string;
  items: IKeyValue[];
  onChange: any;
  value: any;
}) {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.key} value={item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
