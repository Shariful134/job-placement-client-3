import { SkeletonDemo } from "@/components/skeleton/SkeletonDemo";
import { useVerifyOrderQuery } from "@/redux/order/orderApi";
import { Link, useSearchParams } from "react-router-dom";
import logo1 from "../../assets/image/logo.png";
import { OrderData } from "./order.interface";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(searchParams.get("order_id"));
  const orderData: OrderData = data?.data?.[0];
  console.log(orderData);
  const order_id = orderData?.order_id;

  return (
    <div className="pt-20 text-4xl px-10 bg-[#fafafa]">
      {isLoading ? (
        <SkeletonDemo></SkeletonDemo>
      ) : (
        <div className="container font-[inter] max-w-7/12 mx-auto px-10 pt-10">
          <div className=" py-5 px-10 shadow-2xl mb-2">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-3xl"> BookNest</h2>
              <img className="w-[15%]" src={logo1} alt="logo1" />
            </div>
            <div className="flex justify-between text-gray-800 pt-5">
              <div></div>
              <div className="text-end">
                <h3 className="text-sm   font-semibold">
                  Invoice No: {orderData?.invoice_no}
                </h3>
                <h3 className="text-sm font-semibold">
                  Created: {orderData?.date_time}
                </h3>
                <h3 className="text-sm font-semibold">Currency: BDT</h3>
              </div>
            </div>
            <hr className="text-gray-400" />
            <div className="flex justify-between text-gray-800 pt-5">
              <div>
                <h3 className="text-xl  font-semibold">Customer Details</h3>
                <h3 className="text-sm font-semibold">
                  Name: {orderData?.name}
                </h3>
                <h3 className="text-sm font-semibold">
                  Address: {orderData?.address}
                </h3>
                <h3 className="text-sm font-semibold">
                  Email: {orderData?.email}
                </h3>
                <h3 className="text-sm font-semibold">
                  Phone: {orderData?.phone_no}
                </h3>
              </div>
              <div>
                <h3 className="text-xl  font-semibold">Order Details</h3>
                <h3 className="text-sm font-semibold">
                  Order ID: {orderData?.order_id}
                </h3>
                <h3 className="text-sm font-semibold">
                  Amount: {orderData?.amount} BDT
                </h3>
                <h3 className="text-sm font-semibold">
                  Status: {orderData?.bank_status}
                </h3>
              </div>
            </div>
            <div className="flex justify-between font-[inter] text-gray-800 pt-5">
              <div>
                <h3 className="text-xl  font-semibold">Payment Information</h3>
                <h3 className="text-sm font-semibold">
                  Method: {orderData?.method}
                </h3>
                <h3 className="text-sm font-semibold">
                  Transaction ID: {orderData?.bank_trx_id}
                </h3>
                <h3 className="text-sm font-semibold">
                  Sp_Code: {orderData?.sp_code}
                </h3>
                <h3 className="text-sm font-semibold">
                  Sp_Message: {orderData?.sp_message}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to={`/get-orders/${order_id}`}>
              <button className="btn mb-5 border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                View Order
              </button>
            </Link>

            <Link to="/">
              <button className="btn mb-5 border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyOrder;
