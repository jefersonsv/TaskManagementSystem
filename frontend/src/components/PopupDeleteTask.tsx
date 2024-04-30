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
import { THandlerVoid } from "@/types/THandlerVoid";

export function PopupDeleteTask({
  taskTitle,
  showConfirm,
  onCancel,
  onConfirm,
}: {
  taskTitle: string;
  showConfirm: boolean;
  onCancel: THandlerVoid;
  onConfirm: THandlerVoid;
}) {
  return (
    <AlertDialog open={showConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete the task {taskTitle}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
