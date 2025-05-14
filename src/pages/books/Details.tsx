/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
} from "../../redux/book/bookApi";
import { FaBook } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { TBook, TUser } from "../../types/type";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: Book, isFetching } = useGetSingleBookQuery(id);
  const { data: allBooks } = useGetAllBooksQuery(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  // console.log(user);
  const admin = user?.role;

  const book = Book?.data;

  console.log("book: ", book);

  const sameCategory = allBooks?.data?.filter(
    (item: TBook) => item?.category === book?.category
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (book?.imageURL?.length) {
      setSelectedImage(book.imageURL[0]);
    }
  }, [book]);

  const handleBuy = () => {
    if (!token) {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SkeletonLoading />
      </div>
    );
  }
  return (
    <div className="pt-10 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#fafafa] dark:bg-black">
      {/* Book Details Header */}
      <div className="text-center font-[inter]">
        <h2 className="text-3xl font-semibold text-cyan-500 mb-3">
          -- <FaBook className="inline" /> Book Details{" "}
          <FaBook className="inline" /> --
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Discover in-depth details about this book, including its author,
          category, price, and availability.
        </p>
      </div>

      {/* Book Details Card */}
      <div className="flex flex-col md:flex-row gap-6 mt-10 bg-white dark:bg-gray-900 shadow-md rounded p-5 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] ">
            <img
              src={selectedImage || book?.imageURL[0]}
              alt="Book Cover"
              className="rounded object-cover w-full h-auto"
            />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {book?.imageURL?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                className="w-20 h-28 rounded cursor-pointer hover:ring-2 ring-cyan-500"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 space-y-2 font-[inter]">
          <h2 className="text-2xl font-bold">{book?.title}</h2>
          <p>
            <span className="text-cyan-600 font-medium">Category:</span>{" "}
            {book?.category}
          </p>
          <p>
            <span className="text-cyan-600 font-medium">Author:</span>{" "}
            {book?.author}
          </p>
          <p>
            <span className="text-cyan-600 font-medium">Price:</span> $
            {book?.price}
          </p>
          <p>
            <span className="text-cyan-600 font-medium">Quantity:</span>{" "}
            {book?.quantity}
          </p>
          <p>
            <span className="text-cyan-600 font-medium">Publisher:</span>{" "}
            {book?.publisher}
          </p>
          <p>
            <span className="text-cyan-600 font-medium">Publication Date:</span>{" "}
            {book?.publicationDate}
          </p>
          <p>
            <span className="text-cyan-600 font-medium">Description:</span>{" "}
            {book?.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            {admin === "admin" ? (
              <Link to="/">
                <button className="btn-style">Home</button>
              </Link>
            ) : (
              <>
                <button className="btn-style flex items-center gap-2 px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                  Add To Cart <IoMdCart className="text-xl" />
                </button>
                <Link to={`/book-order/${book?._id}`}>
                  <button className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                    Buy Now
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related Books Header */}
      <div className="text-center mt-12 font-[inter]">
        <h2 className="text-3xl font-semibold text-cyan-500 mb-2">
          -- <FaBook className="inline" /> Related Books{" "}
          <FaBook className="inline" /> --
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          More books from the{" "}
          <span className="font-bold text-cyan-600">{book?.category}</span>{" "}
          category you may love!
        </p>
      </div>

      {/* Related Books List */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 pb-10">
        {sameCategory?.map((book: any) => {
          const inStock = book.inStock;
          return (
            <div
              key={book._id}
              className="relative group bg-white dark:bg-gray-900 rounded shadow  transition-shadow duration-300 overflow-hidden"
            >
              <figure className="w-full h-52 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4 relative">
                <img
                  src={book.imageURL[0]}
                  alt={book.title}
                  className="object-contain h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                />

                {/* Add To Cart button inside the image area, centered */}
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 sm:bg-transparent sm:opacity-0 sm:group-hover:opacity-100 sm:pointer-events-none sm:group-hover:pointer-events-auto transition-opacity duration-300">
                  <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white text-sm font-medium rounded-md shadow flex items-center gap-2">
                    Add To Cart <IoMdCart className="text-lg" />
                  </span>
                </button>
              </figure>

              <div className="p-4 text-center space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {book.title}
                </h2>
                <p className="text-cyan-600 font-bold text-sm">${book.price}</p>
                <p
                  className={`text-sm font-medium ${
                    inStock ? "text-green-600" : "text-red-500"
                  }`}
                >
                  InStock: {inStock ? "Available" : "Unavailable"}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <Link to={`/book-details/${book._id}`}>
                    <button className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                      Details
                    </button>
                  </Link>
                  {admin === "admin" ? (
                    <Link to={`/book-update/${book._id}`}>
                      <button className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                        Update
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/book-order/${book._id}`}>
                      <button
                        onClick={handleBuy}
                        className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                      >
                        Buy Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
