import { IPopup } from "@/types/IPopup";
import { IStore } from "@/types/IStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create<IStore>()(
  persist<IStore>(
    (set) => ({
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        });
      },

      message: "",

      showMessage: (message: string) => {
        set({ message });
      },

      // token: null,

      setToken: (token: string) => {
        set({ token });
      },

      popup: null,

      showPopup: (popup: IPopup) => {
        set({ popup });
      },

      dismissPopup: () => {
        set({ popup: null });
      },
    }),
    {
      onRehydrateStorage: () => (state: any) => {
        state.setHasHydrated(true);
      },
      name: "taskStore",
    }
  )
);
