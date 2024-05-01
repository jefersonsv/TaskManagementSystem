import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TFormControl } from "@/types/TFormControl";
import { ForwardedRef, forwardRef } from "react";

interface Props {
  control: TFormControl;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const FormFieldTitle = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <FormField
        control={props.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Type the title"
                autoFocus={props.autoFocus}
                ref={ref}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

export { FormFieldTitle };
