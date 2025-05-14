/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrderQuery } from "@/redux/order/orderApi";
import { useParams } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";

type TOrderDetails = {
  invoiceId: string;
  email: string;
  method: string;
  phone: number;
  totalPrice: number;
  quantity: number;
  status: string;
  title: string;
  date: string;
};

type TUser = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
};

const OrdersHistry = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const email = user?.userEmail;
  const { order_id } = useParams();
  console.log(order_id);

  const { data: allData } = useGetAllOrderQuery(undefined);

  const AllOrderData = allData?.data;

  const currentOrderData = AllOrderData?.filter(
    (data: any) => data?.email === email
  );

  const invoices: TOrderDetails[] =
    currentOrderData?.map((item: any) => ({
      invoiceId: item?.transaction?.id,
      email: item.email,
      method: item?.transaction?.method,
      date: item?.transaction?.date_time,
      phone: item?.phone,
      totalPrice: item?.totalPrice,
      status: item?.status,
      title: item?.product.title,
      quantity: item?.quantity,
    })) || [];

  const subtotal = invoices.reduce((sum, order) => sum + order.totalPrice, 0);
  const [isDark, setIsDark] = useState(false);
  const totalAmount = Number(subtotal).toFixed(2);
  return (
    // <div className="px-10 pt-18 bg-[#fafafa] h-screen">
    //   <h2 className="text-2xl text-center py-5 font-[inter]">
    //     {" "}
    //     Your All Orders
    //   </h2>
    //   <Table className="font-[inter]">
    //     <TableCaption>A list of your recent invoices.</TableCaption>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead>Invoice ID</TableHead>
    //         <TableHead>Status</TableHead>
    //         <TableHead>Email</TableHead>
    //         <TableHead>Method</TableHead>
    //         <TableHead>Phone No.</TableHead>
    //         <TableHead>Date</TableHead>
    //         <TableHead>Product</TableHead>
    //         <TableHead>Quantity</TableHead>
    //         <TableHead>Amount</TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {invoices.map((invoice) => (
    //         <TableRow key={invoice.invoiceId}>
    //           <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
    //           <TableCell>{invoice.status}</TableCell>
    //           <TableCell>{invoice.email}</TableCell>
    //           <TableCell>{invoice.method}</TableCell>
    //           <TableCell>{invoice.phone}</TableCell>
    //           <TableCell>{invoice.date}</TableCell>
    //           <TableCell>{invoice.title} book</TableCell>
    //           <TableCell>{invoice.quantity} </TableCell>
    //           <TableCell>{invoice.totalPrice}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //     <TableFooter>
    //       <TableRow>
    //         <TableCell colSpan={8}>Total</TableCell>
    //         <TableCell>{totalAmount}$</TableCell>
    //       </TableRow>
    //     </TableFooter>
    //   </Table>
    // </div>
    <div className={`${isDark ? "dark" : ""} font-[inter]`}>
      <div className="px-4 md:px-10 pt-10 min-h-screen bg-[#fafafa] dark:bg-black transition-colors duration-300">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-sm text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>

        <h2 className="text-2xl text-center py-5 font-semibold text-gray-800 dark:text-white">
          Your All Orders
        </h2>

        <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 border-collapse">
            <caption className="text-sm text-gray-600 dark:text-gray-400 text-left mb-2">
              A list of your recent invoices.
            </caption>

            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2">Invoice ID</th>
                <th className="p-2">Status</th>
                <th className="p-2">Email</th>
                <th className="p-2">Method</th>
                <th className="p-2">Phone No.</th>
                <th className="p-2">Date</th>
                <th className="p-2">Product</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.invoiceId}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-2 font-medium">{invoice.invoiceId}</td>
                  <td className="p-2">{invoice.status}</td>
                  <td className="p-2">{invoice.email}</td>
                  <td className="p-2">{invoice.method}</td>
                  <td className="p-2">{invoice.phone}</td>
                  <td className="p-2">{invoice.date}</td>
                  <td className="p-2">{invoice.title} book</td>
                  <td className="p-2">{invoice.quantity}</td>
                  <td className="p-2">{invoice.totalPrice}$</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-gray-100 dark:bg-gray-800 font-semibold">
                <td className="p-2" colSpan={8}>
                  Total
                </td>
                <td className="p-2">{totalAmount}$</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersHistry;
