import secure from "../../assets/image/img1.jpeg";
import help from "../../assets/image/img2.jpeg";
import trust from "../../assets/image/img3.jpeg";
import delivery from "../../assets/image/img4.jpeg";
import greate from "../../assets/image/img5.jpeg";

export default function FeatureSection() {
  return (
    <div className="container px-4 mb-15 mx-auto grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-4  mt-15">
      <div className="text-center px-4 border-2 border-slate-200 dark:border-0 dark:bg-gray-900 p-5 bg-white text-black rounded-sm ">
        <img
          width={100}
          height={100}
          src={secure}
          alt="secure"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg dark:text-gray-300">
          100% SECURE PAYMENTS
        </h3>
        <p className="text-sm dark:text-gray-300">
          All major credit & debit cards accepted
        </p>
      </div>

      <div className="dark:border-0 dark:bg-gray-900 text-center px-4 border-2 border-slate-200 p-5 bg-white  text-black  rounded-sm">
        <img
          width={100}
          height={100}
          src={help}
          alt="help center"
          className="mx-auto h-12 mb-3 "
        />
        <h3 className="font-semibold text-lg dark:text-gray-300">
          HELP CENTER
        </h3>
        <p className="text-sm dark:text-gray-300">
          Got a question? Look no further. Browse our FAQs or submit your here.
        </p>
      </div>

      <div className="dark:border-0 dark:bg-gray-900 text-center px-4 border-2 border-slate-200 p-5 bg-white text-black rounded-sm">
        <img
          width={100}
          height={100}
          src={trust}
          alt="trustpay"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg dark:text-gray-300">TRUSTPAY</h3>
        <p className="text-sm dark:text-gray-300">
          100% Payment Protection. Easy Return Policy
        </p>
      </div>

      <div className="dark:border-0 dark:bg-gray-900 text-center px-4 border-2 border-slate-200 p-5 bg-white text-black  rounded-sm">
        <img
          width={100}
          height={100}
          src={delivery}
          alt="worldwide delivery"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg dark:text-gray-300">
          WORLDWIDE DELIVERY
        </h3>
        <p className="text-sm dark:text-gray-300">
          With sites in 5 languages, we ship to over 200 countries & regions.
        </p>
      </div>

      <div className="dark:border-0 dark:bg-gray-900 text-center px-4 border-2 border-slate-200 p-5 bg-white text-black  rounded-sm">
        <img
          width={100}
          height={100}
          src={greate}
          alt="great value"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg dark:text-gray-300">
          GREAT VALUE
        </h3>
        <p className="text-sm dark:text-gray-300">
          We offer competitive prices on our 100 million plus product range.
        </p>
      </div>
    </div>
  );
}
