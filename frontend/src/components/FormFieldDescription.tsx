import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TFormControl } from "@/types/TFormControl";

export function FormFieldDescription({ control }: { control: TFormControl }) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input placeholder="Type the description" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
