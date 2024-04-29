import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TFormControl } from "@/types/TFormControl";

export function FormFieldTitle({ control }: { control: TFormControl }) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Type the title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
