import { useRef, useState } from "react";
import { useGetAllBooksQuery } from "../../redux/book/bookApi";
import { TBook, TUser } from "../../types/type";

import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { Input } from "../ui/input";
import CategorySelect from "../select/CategorySelect";
import Authorselect from "../select/AuthorSelect";
import PriceSelect from "../select/PriceSelect";
import InStockSelect from "../select/InStockSelect";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import BookDelete from "../modal/BookDelete";

const Books = () => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(user);
  const admin = user?.role;

  const booksRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesSelect, setCategoriesSelect] = useState<string[]>([]);
  const [authorSelect, setAuthorSelect] = useState<string[]>([]);
  const [pricesSelect, setPricesSelect] = useState<[number, number] | null>(
    null
  );
  const [inStockSelect, setInStockSelect] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");

  const { data: booksData } = useGetAllBooksQuery(undefined);
  const allBooks = booksData?.data || [];

  const categories = [
    ...new Set(allBooks.map((book: TBook) => book.category)),
  ] as string[];

  const authors = [
    ...new Set(allBooks.map((book: TBook) => book.author)),
  ] as string[];

  // search and filtering
  const allFilteredBooks = allBooks
    ?.slice(0, currentPage)
    .filter((book: TBook) => {
      const searchData =
        searchTerm === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());
      const categoriesData =
        categoriesSelect.length === 0 ||
        categoriesSelect.includes(book.category);
      const authorData =
        authorSelect.length === 0 || authorSelect.includes(book.author);
      const pricesData =
        pricesSelect === null ||
        (book.price >= pricesSelect[0] && book.price <= pricesSelect[1]);

      const stockData =
        inStockSelect === "all" ||
        (inStockSelect === "inStock" && book.inStock) ||
        (inStockSelect === "outOfStock" && !book.inStock);

      return (
        searchData && categoriesData && authorData && pricesData && stockData
      );
    });

  const handleViewMore = () => {
    setCurrentPage(allBooks.length);
    navigate("/get-books");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuy = () => {
    if (!token) {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className=" text-center font-[inter]  px-10 pt-8 bg-[#fafafa]">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaBook className="inline" /> Our Books{" "}
          <FaBook className="inline" /> --{" "}
        </h2>
        <p className="max-w-3/6 mx-auto">
          {" "}
          Explore our most popular books, loved by readers worldwide. From
          fiction to self-help, find your next favorite read today!
        </p>
      </div>
      <div
        ref={booksRef}
        className=" mt-5 flex justify-center flex-wrap lg:gap-4 sm:gap-2 md:gap-4 px-10"
      >
        <Input
          className="w-75 border-gray-500 "
          type="search"
          value={searchTerm}
          placeholder="Search here"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CategorySelect
          categories={categories}
          setCategoriesSelect={setCategoriesSelect}
        ></CategorySelect>
        <Authorselect
          authors={authors}
          setAuthorSelect={setAuthorSelect}
        ></Authorselect>
        <PriceSelect setPricesSelect={setPricesSelect}></PriceSelect>
        <InStockSelect setInStockSelect={setInStockSelect}></InStockSelect>
      </div>
      <div className="flex justify-center flex-wrap gap-4 px-10 my-2 bg-[#fafafa]">
        {allFilteredBooks.length > 0 ? (
          allFilteredBooks?.map((book: TBook) => {
            const inStock = book.inStock;
            return (
              <div
                key={book?._id}
                className="card  w-75 relative group shadow-2xl "
              >
                <figure className="px-5 pt-5">
                  <img src={book.imageURL} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{book?.title}</h2>
                  <p className="text-cyan-600 font-bold">{book?.price} $</p>
                  {inStock ? (
                    <p>InStock: Available</p>
                  ) : (
                    <p>InStock: Unavailable</p>
                  )}
                  {admin === "admin" ? (
                    <div className=" flex flex-wrap justify-center gap-2 font-serif">
                      <Link to={`/book-details/${book._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Details
                        </button>
                      </Link>
                      <Link to={`/book-update/${book._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Update
                        </button>
                      </Link>
                      <BookDelete id={book._id}></BookDelete>
                    </div>
                  ) : (
                    <div className=" flex flex-wrap justify-center gap-2">
                      <Link to={`/book-details/${book._id}`}>
                        <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                          Details
                        </button>
                      </Link>
                      <Link to={`/book-order/${book._id}`}>
                        <button
                          onClick={handleBuy}
                          className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
                        >
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="absolute top-[50%] invisible group-hover:visible  left-0 w-full">
                  <button className="btn w-full border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                    Add To Cart <IoMdCart className="text-xl" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-2xl text-cyan-600">No Book Found!</p>
        )}
      </div>
      <div className="flex justify-center flex-wrap px-10 gap-4 py-2">
        <button
          onClick={handleViewMore}
          className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Books;
