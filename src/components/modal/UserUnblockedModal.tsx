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
      <AlertDialogTrigger className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
        UnBlock
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
