import { Control } from "react-hook-form";

export type TFormControl = Control<
  {
    title: string;
    description: string;
    date: Date;
    status: string;
    priority: string;
  },
  any
>;
