import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<IAuthStore>()(
  persist<IAuthStore>(
    (set) => ({
      token: "",

      setToken: (token: string) => {
        set({ token });
      },
    }),
    {
      name: "authStore",
    }
  )
);
