import { Form } from "@/components/ui/form";
import { FormFieldDate } from "./FormFieldDate";
import { FormFieldDescription } from "./FormFieldDescription";
import { FormFieldPriority } from "./FormFieldPriority";
import { FormFieldStatus } from "./FormFieldStatus";
import { FormFieldTitle } from "./FormFieldTitle";
import { Button } from "./ui/button";

export default function FormTask() {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormFieldTitle control={form.control} />

          <FormFieldDescription control={form.control} />

          <FormFieldDate control={form.control} />

          <FormFieldStatus control={form.control} />

          <FormFieldPriority control={form.control} />

          <Button type="submit">Edit</Button>
        </form>
      </Form>
    </div>
  );
}
