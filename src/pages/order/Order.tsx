/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleBookQuery } from "@/redux/book/bookApi";

import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { useAddOrderMutation } from "@/redux/order/orderApi";
import { TResponse } from "@/types/type";

import { useParams } from "react-router-dom";
import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";
type TUser = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
};

const Order = () => {
  const [quantity, setQuantity] = useState(1);
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { id } = useParams();
  const { data: Book, isFetching } = useGetSingleBookQuery(id);

  const [addOrder, { isLoading }] = useAddOrderMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Procesing Order...", { id: "orderLoading" });
    } else {
      toast.dismiss("orderLoading");
    }
  }, [isLoading]);

  const book = Book?.data;

  const price = book?.price;
  const totalPrice = Number((price * quantity).toFixed(2));

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleOrder = async (e: FieldValues) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const orderData = {
      ...data,
      quantity: quantity,
      totalPrice: totalPrice,
      product: book?._id,
    };

    try {
      const res = (await addOrder(orderData)) as TResponse<any>;
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

  if (isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SkeletonLoading />
      </div>
    );
  }
  return (
    <div className="container mx-auto pt-18 px-10 flex gap-2 flex-col lg:flex-row  justify-center sm:items-center lg:items-start pb-5">
      <div className="card mt-5  w-full max-w-sm shrink-0 shadow">
        <div className="card-body font-[inter] dark:bg-gray-900">
          <div className="flex justify-between items-end">
            <label className="fieldset-label dark:text-gray-300">
              Quantity
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex w-[120px] border-1  justify-between  border-gray-400 bg-accent  rounded-sm">
                <button
                  onClick={handleDecrease}
                  className="hover:bg-gray-300 bg-gray-200 dark:text-gray-300 dark:bg-gray-700   rounded-full px-1"
                >
                  {" "}
                  <LuMinus className=" text-2xl dark:text-gray-300" />
                </button>{" "}
                <p className="text-2xl text-center dark:text-gray-300">
                  {quantity}
                </p>
                <button
                  onClick={handleIncrease}
                  className="hover:bg-gray-300 bg-gray-200 rounded-full px-1 dark:text-gray-300 dark:bg-gray-700"
                >
                  {" "}
                  <FiPlus className=" text-2xl dark:text-gray-300" />
                </button>
              </div>
              <div className="text-end dark:text-gray-300">
                {" "}
                <p className="text-cyan-500  font-bold ">{quantity}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between ">
            <label className="fieldset-label dark:text-gray-300">
              TotalPrice
            </label>
            <div>
              {" "}
              <p className="text-cyan-500 font-bold">{totalPrice} $</p>
            </div>
          </div>
          <hr className="text-gray-400"></hr>
          <fieldset className="fieldset font-[inter]">
            <form onSubmit={handleOrder}>
              <label className="fieldset-label">Name</label>
              <input
                name="name"
                type="text"
                required={true}
                className="input border-1 border-gray-300 dark:text-gray-300 dark:bg-gray-700"
                placeholder="Name"
              />
              <label className="fieldset-label dark:text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                className="input border-1 border-gray-300 dark:text-gray-300 dark:bg-gray-700"
                required={true}
                defaultValue={user?.userEmail}
                placeholder="Email"
              />
              <label className="fieldset-label">Address</label>
              <input
                name="address"
                type="text"
                required={true}
                className="input border-1 border-gray-300 dark:text-gray-300 dark:bg-gray-700"
                placeholder="Address"
              />
              <label className="fieldset-label">Phone</label>
              <input
                name="phone"
                type="number"
                required={true}
                className="input border-1 border-gray-300 dark:text-gray-300 dark:bg-gray-700"
                placeholder="Phone Number"
              />
              <button
                type="submit"
                className="px-4 mt-5 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              >
                Order Now
              </button>
            </form>
          </fieldset>
        </div>
      </div>
      <div className="card  rounded font-[inter] dark:bg-gray-900  flex sm:flex-col md:flex-row lg:flex-row  mx-auto  shadow mt-5 p-5  ">
        <figure>
          <img src={book?.imageURL} alt="Movie" />
        </figure>
        <div className="card-body rounded font-[inter]">
          <div className="flex justify-between items-end">
            <h2 className="card-title">{book?.title}</h2>
          </div>
          <p>
            <span className="text-cyan-600">Category</span>: {book?.category}
          </p>
          <p>
            <span className="text-cyan-600">Author</span>: {book?.author}
          </p>

          <p>
            <span className="text-cyan-600">Price</span>: {book?.price} $
          </p>
          <p>
            <span className="text-cyan-600">Quantity</span>: {book?.quantity}
          </p>
          <p>
            <span className="text-cyan-600">Publisher</span>: {book?.publisher}
          </p>
          <p>
            <span className="text-cyan-600">PublicationDate</span>:{" "}
            {book?.publicationDate}
          </p>
          <p>
            <span className="text-cyan-600">Description</span>:{" "}
            {book?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
