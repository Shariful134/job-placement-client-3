/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeletebookMutation } from "@/redux/book/bookApi";
import { TResponse } from "@/types/type";
import { toast } from "sonner";

const BookDelete = ({ id }: { id: string | undefined }) => {
  const [deleteBook] = useDeletebookMutation();
  const handleDelete = async () => {
    try {
      const res = (await deleteBook(id)) as TResponse<any>;
      console.log("res-update: ", res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif">
            Delete! Are you Confirm?
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-serif">Cancel</AlertDialogCancel>
          <AlertDialogAction className="font-serif" onClick={handleDelete}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookDelete;
