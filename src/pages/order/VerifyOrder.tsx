import { SkeletonDemo } from "@/components/skeleton/SkeletonDemo";
import { useVerifyOrderQuery } from "@/redux/order/orderApi";
import { Link, useSearchParams } from "react-router-dom";
import logo1 from "../../assets/image/logo.png";
import { OrderData } from "./order.interface";
import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(searchParams.get("order_id"));
  const orderData: OrderData = data?.data?.[0];
  console.log(orderData);
  const order_id = orderData?.order_id;

  if (isLoading) {
    <div className="min-h-screen flex justify-center items-center">
      <SkeletonLoading />
    </div>;
  }
  return (
    <div className="pt-20 px-4 md:px-10 bg-[#fafafa] dark:bg-black min-h-screen">
      {isLoading ? (
        <SkeletonDemo />
      ) : (
        <div className="font-[inter] max-w-screen-lg mx-auto pt-10">
          <div className="py-5 px-4 md:px-10 shadow bg-white dark:bg-gray-900 rounded-md mb-4">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-gray-800 dark:text-gray-200">
              <h2 className="text-lg sm:text-3xl font-bold">BookNest</h2>
              <img className="w-20 sm:w-[15%]" src={logo1} alt="logo1" />
            </div>

            {/* Invoice & Created Info */}
            <div className="flex flex-col sm:flex-row justify-between text-gray-800 dark:text-gray-300 pt-5">
              <div></div>
              <div className="text-right">
                <h3 className="text-xs sm:text-sm font-semibold">
                  Invoice No: {orderData?.invoice_no}
                </h3>
                <h3 className="text-xs sm:text-sm font-semibold">
                  Created: {orderData?.date_time}
                </h3>
                <h3 className="text-xs sm:text-sm font-semibold">
                  Currency: BDT
                </h3>
              </div>
            </div>

            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            {/* Customer & Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-300">
              {/* Customer Info */}
              <div>
                <h3 className="text-base sm:text-xl font-semibold mb-1">
                  Customer Details
                </h3>
                <p className="text-sm sm:text-base">Name: {orderData?.name}</p>
                <p className="text-sm sm:text-base">
                  Address: {orderData?.address}
                </p>
                <p className="text-sm sm:text-base">
                  Email: {orderData?.email}
                </p>
                <p className="text-sm sm:text-base">
                  Phone: {orderData?.phone_no}
                </p>
              </div>

              {/* Order Info */}
              <div>
                <h3 className="text-base sm:text-xl font-semibold mb-1">
                  Order Details
                </h3>
                <p className="text-sm sm:text-base">
                  Order ID: {orderData?.order_id}
                </p>
                <p className="text-sm sm:text-base">
                  Amount: {orderData?.amount} BDT
                </p>
                <p className="text-sm sm:text-base">
                  Status: {orderData?.bank_status}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-6 text-gray-800 dark:text-gray-300">
              <h3 className="text-base sm:text-xl font-semibold mb-1">
                Payment Information
              </h3>
              <p className="text-sm sm:text-base">
                Method: {orderData?.method}
              </p>
              <p className="text-sm sm:text-base">
                Transaction ID: {orderData?.bank_trx_id}
              </p>
              <p className="text-sm sm:text-base">
                Sp_Code: {orderData?.sp_code}
              </p>
              <p className="text-sm sm:text-base">
                Sp_Message: {orderData?.sp_message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`/get-orders/${order_id}`}>
              <button className="btn px-5 py-2 rounded-md border border-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white transition-all">
                View Order
              </button>
            </Link>
            <Link to="/">
              <button className="btn px-5 py-2 rounded-md border border-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white transition-all">
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
