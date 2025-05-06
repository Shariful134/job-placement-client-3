import { Link } from "react-router-dom";
import image1 from "../../assets/image/About/8e57tn0b.png";
import image2 from "../../assets/image/About/do8zts1g.png";
import image3 from "../../assets/image/About/emlo3u4o.png";
import image4 from "../../assets/image/About/j90o418b.png";

const Choice = () => {
  return (
    <div className="font-[inter] px-10">
      <div>
        <div>
          <h2 className="text-4xl text-center pt-5 pb-2 text-cyan-500">
            Why Choose Us?
          </h2>
          <p className=" text-center mx-auto max-w-8/12">
            We are passionate about books and dedicated to providing the best
            reading experience. With a vast collection, unbeatable prices, and
            fast delivery, we ensure book lovers find what they need
            effortlessly.
          </p>
        </div>
        <div className="flex justify-center flex-wrap py-5 gap:5 sm:gap-15 lg:gap-20">
          <div className="max-w-55  h-[400px] flex flex-col justify-center items-center">
            <img
              className="w-[85%] border-2 border-white shadow-2xl rounded-full"
              src={image1}
              alt=""
            />
            <h2 className="text-3xl pt-1  pb-2">Best Collection</h2>
            <p className="text-center">
              Discover a diverse range of books, from popular bestsellers to
              rare literary treasures, ensuring something
            </p>
            <Link to="/get-books">
              <button className=" btn border-1 rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Books
              </button>
            </Link>
          </div>
          <div className="max-w-55  h-[400px] flex flex-col justify-center items-center">
            <img
              className="w-[85%] border-2 border-white shadow-2xl rounded-full"
              src={image2}
              alt=""
            />
            <h2 className="text-3xl pb-2 pt-1">Best Pricesn</h2>
            <p className="text-center">
              Enjoy budget-friendly prices on all books, making reading
              accessible and enjoyable without breaking the bank.
            </p>
            <Link to="/get-books">
              <button className=" btn border-1 rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Books
              </button>
            </Link>
          </div>
          <div className="max-w-55  h-[400px] flex flex-col justify-center items-center">
            <img
              className="w-[85%] border-2 border-white shadow-2xl rounded-full"
              src={image3}
              alt=""
            />
            <h2 className="text-3xl pb-2 pt-1">Fast Delivery</h2>
            <p className="text-center">
              Receive your favorite books at reliable, and your doorstep with
              our fast, reliable, and secure delivery service.
            </p>
            <Link to="/get-books">
              <button className=" btn border-1 rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Books
              </button>
            </Link>
          </div>
          <div className="max-w-55  h-[400px] flex flex-col justify-center items-center">
            <img
              className="w-[85%] border-2 border-white shadow-2xl rounded-full"
              src={image4}
              alt=""
            />
            <h2 className="text-3xl pb-2 text-center">Custom Satisfy</h2>
            <p className="text-center">
              Discover a diverse range of books, from popular bestsellers to
              rare literary treasures, ensuring something
            </p>
            <Link to="/get-books">
              <button className=" btn border-1 rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Books
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choice;
