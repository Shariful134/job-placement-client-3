import { Link, useLocation, useParams } from "react-router";
import {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
} from "../../redux/book/bookApi";
import { FaBook } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { TBook, TUser } from "../../types/type";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import BookDelete from "@/components/modal/BookDelete";

const Details = () => {
  const location = useLocation();
  const { id } = useParams();
  const { data: Book } = useGetSingleBookQuery(id);
  const { data: allBooks } = useGetAllBooksQuery(undefined);

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  // console.log(user);
  const admin = user?.role;

  const book = Book?.data;

  const sameCategory = allBooks?.data?.filter(
    (item: TBook) => item?.category === book?.category
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="pt-10 px-10 bg-[#fafafa]">
      <div className=" text-center pt-8 font-[inter]">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaBook className="inline" /> Book Details{" "}
          <FaBook className="inline" /> --{" "}
        </h2>
        <p className="max-w-3/6 mx-auto">
          Discover in-depth details about this book, including its author,
          category, price, and availability. Get insights into the story and why
          readers love it!
        </p>
      </div>
      <div className="card max-w-10/12 flex sm:flex-col md:flex-row lg:flex-row  mx-auto shadow-2xl  mt-5 p-5  ">
        <figure>
          <img src={book?.imageURL} alt="imageURL" />
        </figure>
        <div className="card-body font-[inter]  ">
          <h2 className="card-title">{book?.title}</h2>
          <p>
            <span className="text-cyan-600">Category</span>: {book?.category}
          </p>
          <p>
            <span className="text-cyan-600">Author</span>: {book?.author}
          </p>

          <p>
            <span className="text-cyan-600">Price</span>: {book?.price} $
          </p>
          <p>
            <span className="text-cyan-600">Quantity</span>: {book?.quantity}
          </p>
          <p>
            <span className="text-cyan-600">Publisher</span>: {book?.publisher}
          </p>
          <p>
            <span className="text-cyan-600">PublicationDate</span>:{" "}
            {book?.publicationDate}
          </p>
          <p>
            <span className="text-cyan-600">Description</span>:{" "}
            {book?.description}
          </p>
          {admin == "admin" ? (
            <div className="card-actions justify-start">
              <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Add To Cart <IoMdCart className="text-xl" />
              </button>
              <Link to="/">
                <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                  Home
                </button>
              </Link>
            </div>
          ) : (
            <div className="card-actions justify-start">
              <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                Add To Cart <IoMdCart className="text-xl" />
              </button>
              <Link to="/">
                <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                  Home
                </button>
              </Link>
              <Link to={`/book-order/${book?._id}`}>
                <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                  Buy Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className=" text-center font-[inter] pt-8 ">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaBook className="inline" /> Releted Book{" "}
          <FaBook className="inline" /> --{" "}
        </h2>
        <p className="max-w-3/6 mx-auto">
          More books from the{" "}
          <span className="font-bold text-cyan-600">{book?.category}</span>{" "}
          category that you may love!
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-4 pb-5 font-[inter] bg-[#fafafa]">
        {sameCategory?.map((sameBook: TBook) => {
          const inStock = sameBook.inStock;
          return (
            <div
              key={sameBook?._id}
              className="card  w-75 relative group shadow-2xl"
            >
              <figure className="px-5 pt-5">
                <img
                  src={sameBook.imageURL}
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{sameBook?.title}</h2>
                <p className="text-cyan-600 font-bold">{sameBook?.price} $</p>
                <p className="text-cyan-600 font-bold">
                  Category: {sameBook?.category}
                </p>
                {inStock ? (
                  <p>InStock: Available</p>
                ) : (
                  <p>InStock: Unavailable</p>
                )}

                <div className="flex gap-2 flex-wrap font-[inter] justify-center">
                  {admin == "admin" ? (
                    <div className="flex  flex-wrap justify-center gap-2">
                      <Link to={`/book-details/${sameBook?._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Details
                        </button>
                      </Link>
                      <Link to={`/book-update/${sameBook?._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Update
                        </button>
                      </Link>
                      <BookDelete id={sameBook?._id}></BookDelete>
                      <Link to="/">
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Home
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-2 flex-wrap justify-center">
                      <Link to={`/book-details/${sameBook?._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Details
                        </button>
                      </Link>
                      <Link to="/">
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Home
                        </button>
                      </Link>
                      <Link to={`/book-order/${book._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-[50%] invisible group-hover:visible  left-0 w-full">
                <button className="btn w-full border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                  Add To Cart <IoMdCart className="text-xl" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
