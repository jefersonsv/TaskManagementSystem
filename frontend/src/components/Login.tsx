import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetToken } from "@/lib/api";
import { go } from "@/lib/url";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: "You must provide the username",
  }),
  password: z.string().min(2, {
    message: "You must provide the passowrd",
  }),
});

export default function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const showPopup = useTaskStore((state) => state.showPopup);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await GetToken(values.username, values.password);
    if (res.success) {
      setToken(res.data?.token);
      toast.message("Login Successfully");
      go("/");
    } else {

      showPopup({
        title: "Error",
        message: res.message!,
      });
    }
  }

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-4">
        Login
      </h2>

      <p>Demo:</p>
      <p>user: admin</p>
      <p>pass: admin</p>

      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="admin" {...field} autoFocus={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign in</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
