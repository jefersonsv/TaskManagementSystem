import { Form } from "@/components/ui/form";
import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import { formSchema } from "@/types/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "",
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        const { title, description, date, priority, status } = res.data;
        form.setValue("title", title);
        form.setValue("description", description);
        form.setValue("date", new Date(date));
        form.setValue("priority", EPriority[priority]);
        form.setValue("status", EStatus[status]);
      } catch (err: any) {
        if (err?.response?.data?.status === 404) {
          toast.error("Task not found");
          setTimeout(() => (window.location.href = "/"), 1000);
        }
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

    const res = await axios.put(`/api/tasks/${id}`, {
      ...obj,
    });

    if (res.status === 200) {
      toast(`Task number ${id} updated successfully`);
      setTimeout(
        () => (window.location.href = `/edit-task/${id}`),
        1000
      );
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
            <FormFieldTitle control={form.control} />

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
