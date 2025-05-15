/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectForm from "@/components/form/SelectForm";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "@/redux/order/orderApi";
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { TAllOrder, TOrder } from "./AllOrder.type";

import { Button } from "@/components/ui/button";
import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";

const AllOrder = () => {
  const { data: allData, isLoading } = useGetAllOrderQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const filteredOrders = invoices?.filter((order: TOrder) => {
    const search = searchTerm.toLowerCase();
    const matchEmail = order.email.toLowerCase().includes(search);

    if (!selectedFilter || selectedFilter === "both") {
      return matchEmail;
    } else if (selectedFilter === "email") {
      return matchEmail;
    }
    return true;
  });

  // Reset pagination on search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  const totalPages = Math.ceil((filteredOrders?.length || 1) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const subtotal =
    currentOrders?.reduce(
      (sum: number, item: any) => sum + Number(item.totalAmount),
      0
    ) ?? 0;

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading) {
    <div className="min-h-screen flex justify-center items-center">
      <SkeletonLoading />
    </div>;
  }
  return (
    <div className="pt-18">
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <SkeletonLoading />
        </div>
      ) : (
        <div>
          <div className="text-center font-[inter] pb-10 pt-5">
            <h2 className="text-3xl mb-2 text-cyan-500">
              -- <FaBook className="inline" /> All Orders Data{" "}
              <FaBook className="inline" /> --
            </h2>
            <p>
              Currently, we have a total of {allData?.data?.length || 0} user
              orders.
            </p>
          </div>

          {!invoices || invoices.length === 0 ? (
            <h2 className="text-4xl text-center pb-5">No Data Found!</h2>
          ) : (
            <div>
              <div className="flex flex-wrap font-[inter] gap-2 mb-4">
                <div className="w-60">
                  <Input
                    className="w-full border border-gray-400"
                    type="search"
                    value={searchTerm}
                    placeholder="Search here"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-60">
                  <SelectForm
                    options={options}
                    placeholder="Select"
                    onChange={setSelectedFilter}
                  />
                </div>
              </div>

              <Table className="font-[inter]">
                <TableHeader className="bg-gray-200">
                  <TableRow className="dark:bg-gray-900">
                    <TableHead>#</TableHead>
                    <TableHead>Email</TableHead>
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
                  {currentOrders?.length > 0 ? (
                    currentOrders.map((order: TOrder) => (
                      <TableRow key={order._id}>
                        <TableCell>{order.index}.</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.method}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.productId}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.totalAmount} BDT</TableCell>
                        <TableCell className="flex flex-wrap gap-2">
                          <Button
                            onClick={() => handleDelete(order._id)}
                            className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        No Data Found
                      </TableCell>
                    </TableRow>
                  )}

                  {currentOrders?.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-right font-bold">
                        Subtotal:
                      </TableCell>
                      <TableCell className="font-bold">
                        {subtotal.toFixed(2)} BDT
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 gap-2">
                <Button
                  className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </Button>
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={
                      currentPage === index + 1
                        ? "bg-cyan-500 text-white"
                        : "bg-cyan-100 text-black"
                    }
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
