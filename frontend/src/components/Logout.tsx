import { go } from "@/lib/url";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

export default function Logout() {
  const authStore = useAuthStore.getState();
  authStore.setToken("");
  toast.message("You are sign out");

  go("/");

  return undefined;
}
