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
    <div className="px-10 pt-18 bg-[#fafafa]">
      <h2 className="text-2xl text-center py-5">Recently Your Order</h2>
      <Table className="font-[inter]">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Status</TableHead>
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
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell>{orderData?.totalPrice}$</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrdersData;
