/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { useGetSingleBookQuery } from "@/redux/book/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { useAddOrderMutation } from "@/redux/order/orderApi";
import { TResponse } from "@/types/type";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { toast } from "sonner";
type TUser = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
};

const ModalOrder = ({ id }: { id: string }) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  console.log(user);
  const { data: bookData } = useGetSingleBookQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const book = bookData?.data;
  const price = book?.price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const order = {
    email: user?.userEmail,
    quantity: quantity,
    product: book?._id,
    totalPrice: price,
  };
  const hanldeOrder = async () => {
    if (isLoading) {
      toast.success("Prossecing...");
    }
    try {
      const res = (await addOrder(order)) as TResponse<any>;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res?.data?.message);
        window.location.href = res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
          variant="outline"
        >
          Order Confirm
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4 font-[inter]">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{book?.title}</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Quantity:</Label>
              <div className="flex w-[120px] border-1  justify-between border-amber-400 font-[inter] rounded-2xl">
                <button
                  onClick={handleDecrease}
                  className="hover:bg-rose-400 rounded-full px-1"
                >
                  {" "}
                  <LuMinus className=" text-2xl" />
                </button>{" "}
                <p className="  text-2xl">{quantity}</p>
                <button
                  onClick={handleIncrease}
                  className="hover:bg-rose-400 rounded-full px-1"
                >
                  {" "}
                  <FiPlus className=" text-2xl" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Price:</Label>
              <p>{price} $</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Button
                onClick={hanldeOrder}
                className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
                variant="outline"
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModalOrder;
