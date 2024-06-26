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

export function PopupHighPriority({
  showConfirm,
  onCancel,
  onConfirm,
}: {
  showConfirm: boolean;
  onCancel: THandlerVoid;
  onConfirm: THandlerVoid;
}) {
  return (
    <AlertDialog open={showConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>High Priority Task</AlertDialogTitle>
          <AlertDialogDescription>
            This task is set to High Priority. Continue?
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
