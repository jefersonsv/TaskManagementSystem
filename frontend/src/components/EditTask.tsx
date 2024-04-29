import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { priorityToString, statusToString } from "@/lib/convert";
import { cn } from "@/lib/utils";
import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import { formSchema } from "@/types/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { FormFieldTitle } from "./FormFieldTitle";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropdown from "./StatusDropdown";
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

  type FormType2 = typeof form.control;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:5234/api/tasks/${id}`);

        const { title, description, date, priority, status } = res.data;

        console.info(EPriority[priority]);
        form.setValue("title", title);
        form.setValue("description", description);
        form.setValue("date", new Date(date));
        form.setValue("priority", "high");
        form.setValue(
          "status",
          statusToString(EStatus[status] as any) as string
        );
      } catch (err: any) {
        if (err?.response?.data?.status === 404) {
          toast.error("Task not found");
          setTimeout(() => (window.location.href = "/"), 1000);
        }
      }
    })();
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);

  async function createTask() {
    const values = form.getValues();
    const obj = {
      ...values,
      priority: parseInt(EPriority[values.priority as any]),
      status: parseInt(EStatus[values.status as any]),
    };

    const res = await axios.post("http://localhost:5234/api/tasks", {
      ...obj,
    });

    if (res.status === 200) {
      toast(`Task number ${res.data} created successfully`);
      setTimeout(
        () => (window.location.href = "http://localhost:5173/new-task"),
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
      await createTask();
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
            <FormFieldTitle form={form} />

            <FormField
              control={form.control}
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

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <br />
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          {...field}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <StatusDropdown
                    placeholder="Select the status"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <PriorityDropdown
                    placeholder="Select the priority"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Edit</Button>
          </form>
        </Form>
      </div>

      <AlertDialog open={showConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>High Priority Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to set the task as high priority?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => createTask()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
