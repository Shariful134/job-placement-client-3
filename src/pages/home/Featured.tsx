import secure from "../../assets/image/secure.png";
import help from "../../assets/image/help.png";
import trust from "../../assets/image/trust.png";
import delivery from "../../assets/image/delivery.png";
import greate from "../../assets/image/graeat.png";

export default function FeatureSection() {
  return (
    <div className="container mb-15 mx-auto grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-4  mt-15">
      <div className="text-center px-4 border-2 border-white p-5 bg-cyan-500 text-black rounded-sm">
        <img
          width={100}
          height={100}
          src={secure}
          alt="secure"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg">100% SECURE PAYMENTS</h3>
        <p className="text-sm">All major credit & debit cards accepted</p>
      </div>

      <div className="text-center px-4 border-2 border-white p-5 bg-cyan-500 text-black  rounded-sm">
        <img
          width={100}
          height={100}
          src={help}
          alt="help center"
          className="mx-auto h-12 mb-3 "
        />
        <h3 className="font-semibold text-lg">HELP CENTER</h3>
        <p className="text-sm">
          Got a question? Look no further. Browse our FAQs or submit your here.
        </p>
      </div>

      <div className="text-center px-4 border-2 border-white p-5 bg-cyan-500 text-black rounded-sm">
        <img
          width={100}
          height={100}
          src={trust}
          alt="trustpay"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg">TRUSTPAY</h3>
        <p className="text-sm">100% Payment Protection. Easy Return Policy</p>
      </div>

      <div className="text-center px-4 border-2 border-white p-5 bg-cyan-500 text-black  rounded-sm">
        <img
          width={100}
          height={100}
          src={delivery}
          alt="worldwide delivery"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg">WORLDWIDE DELIVERY</h3>
        <p className="text-sm">
          With sites in 5 languages, we ship to over 200 countries & regions.
        </p>
      </div>

      <div className="text-center px-4 border-2 border-white p-5 bg-cyan-500 text-black  rounded-sm">
        <img
          width={100}
          height={100}
          src={greate}
          alt="great value"
          className="mx-auto h-12 mb-3"
        />
        <h3 className="font-semibold text-lg">GREAT VALUE</h3>
        <p className="text-sm">
          We offer competitive prices on our 100 million plus product range.
        </p>
      </div>
    </div>
  );
}
