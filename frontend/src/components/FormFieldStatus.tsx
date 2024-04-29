import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TFormControl } from "@/types/TFormControl";
import StatusDropdown from "./StatusDropdown";

export function FormFieldStatus({ control }: { control: TFormControl }) {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <StatusDropdown
            placeholder={field.value || "Select the status"}
            onChange={field.onChange}
            value={field.value}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
