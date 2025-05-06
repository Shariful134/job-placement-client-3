/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrderQuery } from "@/redux/order/orderApi";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

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

const OrdersData = () => {
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

  const totalAmount = invoices.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );
  return (
    <div className="px-10 pt-18 bg-[#fafafa]">
      <h2 className="text-2xl text-center py-5 font-[inter]">
        {" "}
        Your All Orders
      </h2>
      <Table className="font-[inter]">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoiceId}>
              <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.title} book</TableCell>
              <TableCell>{invoice.quantity} </TableCell>
              <TableCell>{invoice.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total</TableCell>
            <TableCell>{totalAmount}$</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrdersData;
