import { Form } from "@/components/ui/form";
import { GetTask, UpdateTask } from "@/lib/api";
import { go } from "@/lib/url";
import { useAuthStore } from "@/stores/useAuthStore";
import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import { formSchema } from "@/types/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { FormFieldDate } from "./FormFieldDate";
import { FormFieldDescription } from "./FormFieldDescription";
import { FormFieldPriority } from "./FormFieldPriority";
import { FormFieldStatus } from "./FormFieldStatus";
import { FormFieldTitle } from "./FormFieldTitle";
import { PopupHighPriority } from "./PopupHighPriority";
import { Button } from "./ui/button";

export default function EditTask() {
  const { id } = useParams();
  const token = useAuthStore((state) => state.token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      status: "",
      priority: "",
    },
  });

  useEffect(() => {
    (async () => {
      const res = await GetTask(token, parseInt(id!));

      if (res.success) {
        const { title, description, date, priority, status } = res.data;
        form.setValue("title", title);
        form.setValue("description", description);
        form.setValue("date", new Date(date));
        form.setValue("priority", EPriority[priority]);
        form.setValue("status", EStatus[status]);
      } else {
        toast.error(res.message);
        go("/");
      }
    })();
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);

  async function editTask() {
    const values = form.getValues();
    const obj = {
      title: values.title,
      description: values.description,
      date: format(values.date, "yyyy-MM-dd"),
      priority: parseInt(EPriority[values.priority as any]),
      status: parseInt(EStatus[values.status as any]),
    };

    const res = await UpdateTask(token, parseInt(id!), obj);
    if (res.success) {
      toast(`Task number ${id} updated successfully`);
      go("/list-tasks");
    } else {
      toast.error("An error occurred while creating the task");
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.priority === EPriority[EPriority.High]) {
      setShowConfirm(true);
    } else {
      await editTask();
    }
  }

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-4">
        Edit task
      </h2>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFieldTitle control={form.control} autoFocus={true} />

            <FormFieldDescription control={form.control} />

            <FormFieldDate control={form.control} />

            <FormFieldStatus control={form.control} />

            <FormFieldPriority control={form.control} />

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>

      <PopupHighPriority
        showConfirm={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => editTask()}
      />
    </>
  );
}
