import SelectForm from "@/components/form/SelectForm";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrderQuery } from "@/redux/order/orderApi";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { TAllOrder, TOrder } from "./AllOrder.type";

import { SkeletonDemo } from "@/components/skeleton/SkeletonDemo";
import OrderDelete from "@/components/modal/OrderDelete";

const AllOrder = () => {
  const { data: allData, isLoading } = useGetAllOrderQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  console.log(allData?.data);
  const invoices = allData?.data?.map((item: TAllOrder, index: number) => ({
    _id: item?._id,
    email: item?.email,
    orderId: item?.transaction.id,
    date: item.transaction.date_time,
    status: item?.status,
    quantity: item?.quantity,
    totalAmount: item?.totalPrice,
    method: item?.transaction.method,
    productId: item?.product._id,
    productName: item?.product.title,
    index: index + 1,
  }));

  const options = [
    { value: "both", label: "Email & Name" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
  ];

  const filteredUsers = invoices?.filter((user: TOrder) => {
    const SearchData = searchTerm
      ? user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    if (!selectedFilter || selectedFilter === "both") {
      return SearchData;
    } else if (selectedFilter === "email") {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="px-10 pt-18 bg-[#fafafa]">
      {isLoading ? (
        <SkeletonDemo />
      ) : (
        <div>
          <div className=" text-center font-[inter] pb-10 pt-5">
            <h2 className="text-3xl mb-2  text-cyan-500">
              -- <FaBook className="inline" /> All Orders Data{" "}
              <FaBook className="inline" /> --{" "}
            </h2>
            <p>
              Currently, we have a total of {allData?.data?.length} Order of
              users.
            </p>
          </div>

          {!invoices || invoices.length === 0 ? (
            <h2 className="text-4xl text-center pb-5">No Data Found!</h2>
          ) : (
            <div>
              <div className="flex flex-wrap flex-start font-[inter] gap-2">
                <div className="w-60">
                  <Input
                    className="w-full border-1 border-gray-400 "
                    type="search"
                    value={searchTerm}
                    placeholder="Search here"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-60">
                  <SelectForm
                    options={options}
                    placeholder="Selecet"
                    onChange={setSelectedFilter}
                  ></SelectForm>
                </div>
              </div>
              <Table className="font-[inter]">
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="max-w-5/6">Email</TableHead>
                    <TableHead>OrderId</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ProductId</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>TotalAmount</TableHead>
                    <TableHead className="text-start">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.length > 0 ? (
                    filteredUsers?.map((order: TOrder) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium font-[inter]">
                          {order.index}. {order.email}
                        </TableCell>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.method}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.productId}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.totalAmount} BDT</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell className="flex flex-wrap  gap-2">
                          <OrderDelete id={order._id}></OrderDelete>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No Data</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
