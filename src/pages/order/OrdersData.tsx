import { useGetSingleOrderQuery } from "@/redux/order/orderApi";
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

type TOrderDetails = {
  invoiceId: string;
  method: string;
  phone: number;
  totalPrice: number;
  quantity: number;
  status: string;
  title: string;
  date: string;
};

const OrdersData = () => {
  const { order_id } = useParams();
  console.log(order_id);
  const { isLoading, data: order } = useGetSingleOrderQuery(order_id);

  const orderData = order?.data;
  console.log(orderData);
  console.log(isLoading);

  //table

  const orderDetails = {
    invoiceId: orderData?.transaction?.id,
    method: orderData?.transaction?.method,
    date: orderData?.transaction?.date_time,
    phone: orderData?.phone,
    totalPrice: orderData?.totalPrice,
    status: orderData?.status,
    title: orderData?.product.title,
    quantity: orderData?.quantity,
  };
  const invoices: TOrderDetails[] = [];
  invoices.push(orderDetails);
  return (
    <div className="container mx-auto pt-18 bg-[#fafafa] dark:bg-black min-h-screen text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl text-center py-5 text-gray-900 dark:text-gray-300">
        Recently Your Order
      </h2>
      <Table className="font-[inter] w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <TableCaption className="text-gray-600 dark:text-gray-300">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow className="dark:bg-gray-900">
            <TableHead className="text-gray-700 dark:text-gray-300">
              Invoice ID
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Status
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Method
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Phone No.
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Date
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Product
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Quantity
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoiceId}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.title} book</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>{invoice.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100 dark:bg-gray-900 font-semibold">
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell>{orderData?.totalPrice}$</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrdersData;
