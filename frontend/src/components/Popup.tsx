import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTaskStore } from "@/stores/useTaskStore";
import { IPopup } from "@/types/IPopup";

export function Popup({ popup }: { popup?: IPopup | null | undefined }) {
  const dismissPopup = useTaskStore((state) => state.dismissPopup);

  if (popup) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{popup.title}</AlertDialogTitle>
            <AlertDialogDescription>{popup.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={dismissPopup}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
}
