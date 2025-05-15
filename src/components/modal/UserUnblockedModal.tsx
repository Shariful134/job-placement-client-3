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
import { useBlockUserMutation } from "@/redux/user/userApi";
import { TResponse } from "@/types/type";
import { toast } from "sonner";
import { Button } from "../ui/button";

const UserUnblockedModal = ({ id }: { id: string | undefined }) => {
  const [unBlock] = useBlockUserMutation();
  const handleDelete = async () => {
    try {
      const res = (await unBlock(id)) as TResponse<any>;

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
      <AlertDialogTrigger>
        <Button className="text-black btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
          Unblock
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-serif">
        <AlertDialogHeader>
          <AlertDialogTitle>UnBlock! Are you Confirm?</AlertDialogTitle>
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

export default UserUnblockedModal;
