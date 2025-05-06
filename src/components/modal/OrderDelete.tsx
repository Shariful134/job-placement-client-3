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
import { useDeleteOrderMutation } from "@/redux/order/orderApi";

import { TResponse } from "@/types/type";
import { toast } from "sonner";

const OrderDelete = ({ id }: { id: string | undefined }) => {
  const [deleteuser] = useDeleteOrderMutation();
  const handleDelete = async () => {
    try {
      const res = (await deleteuser(id)) as TResponse<any>;
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
      <AlertDialogTrigger className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gary-200">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="font-serif">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete! Are you Confirm?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderDelete;
