import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TFormControl } from "@/types/TFormControl";
import PriorityDropdown from "./PriorityDropdown";

export function FormFieldPriority({ control }: { control: TFormControl }) {
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <PriorityDropdown
              placeholder={field.value || "Select the priority"}
              onChange={field.onChange}
              value={field.value}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
