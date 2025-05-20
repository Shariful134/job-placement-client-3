/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAppDispath, useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";
import { TCategory } from "@/pages/admin/CreateCategory";
import { Skeleton } from "../ui/skeleton";
import { addBook } from "@/redux/cart/cartSlice";
import { SkeletonLoading } from "../skeletonLoading/SkeletonLoading";

const Books = () => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  const dispatch = useAppDispath();
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const admin = user?.role;

  const booksRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [opoenFiltereing, setOpenFiltering] = useState<boolean>(false);
  const [categoriesSelect, setCategoriesSelect] = useState<string[]>([]);
  const [authorSelect, setAuthorSelect] = useState<string[]>([]);
  const [pricesSelect, setPricesSelect] = useState<[number, number] | null>(
    null
  );
  const [inStockSelect, setInStockSelect] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");

  const { data: booksData, isFetching } = useGetAllBooksQuery(undefined);
  const allBooks = booksData?.data || [];
  const { data: getCategory } = useGetAllcategoryQuery(undefined);

  const allcategory = getCategory?.data || [];

  const categories = [
    ...new Set(allcategory.map((category: TCategory) => category.name)),
  ] as string[];

  console.log("Option: ", allcategory);
  const authors = [
    ...new Set(allBooks.map((book: TBook) => book.author)),
  ] as string[];

  // search and filtering
  const allFilteredBooks = allBooks
    ?.slice(0, currentPage)
    .filter((book: any) => {
      const searchData =
        searchTerm === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.categoryId.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoriesData =
        categoriesSelect.length === 0 ||
        categoriesSelect.includes(book.categoryId.name);
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

  const handleFiltering = () => {
    if (opoenFiltereing) {
      setOpenFiltering(false);
    } else {
      setOpenFiltering(true);
    }
  };
  const handleBuy = () => {
    if (!token) {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  };

  //  handle Cart
  const handleAddBook = (book: TBook) => {
    dispatch(addBook(book));
  };

  if (isFetching) {
    return (
      <div>
        <Skeleton></Skeleton>
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className=" text-center font-[inter]  px-10 pt-8 bg-[#fafafa] dark:bg-black">
        <h2 className="text-3xl mb-2 text-cyan-500 dark:text-gray-300">
          -- <FaBook className="inline" /> Our Books{" "}
          <FaBook className="inline" /> --
        </h2>
        <p className="max-w-3/6 mx-auto dark:text-gray-300">
          {" "}
          Explore our most popular books, loved by readers worldwide. From
          fiction to self-help, find your next favorite read today! Explore our
          most popular books, loved by readers worldwide. From fiction to
          self-help, find your
        </p>
      </div>
      <div className="px-5 grid grid-cols-1 md:grid-cols-12 gap-5 mt-10">
        <div ref={booksRef} className=" col-span-1 md:col-span-3 lg:col-span-2">
          {!opoenFiltereing && (
            <button
              className="inline sm:hidden w-full px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              onClick={handleFiltering}
            >
              Show Filtering
            </button>
          )}
          {opoenFiltereing && (
            <div className=" grid grid-cols-1 gap-5">
              <button
                className="inline sm:hidden w-full px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={handleFiltering}
              >
                Hide Filtering
              </button>
              <Input
                className="w-full border-gray-500 dark:text-gray-300"
                type="search"
                value={searchTerm}
                placeholder="Search here"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CategorySelect
                categories={categories}
                setCategoriesSelect={setCategoriesSelect}
              />
              <Authorselect
                authors={authors}
                setAuthorSelect={setAuthorSelect}
              />
              <PriceSelect setPricesSelect={setPricesSelect} />
              <InStockSelect setInStockSelect={setInStockSelect} />
            </div>
          )}
          <div className="hidden sm:grid grid-cols-1 gap-5">
            <Input
              className="w-full border-gray-500 dark:text-gray-300"
              type="search"
              value={searchTerm}
              placeholder="Search here"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CategorySelect
              categories={categories}
              setCategoriesSelect={setCategoriesSelect}
            />
            <Authorselect authors={authors} setAuthorSelect={setAuthorSelect} />
            <PriceSelect setPricesSelect={setPricesSelect} />
            <InStockSelect setInStockSelect={setInStockSelect} />
          </div>
        </div>
        <div className="col-span-1 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fafafa] dark:bg-black p-4">
            {allFilteredBooks.length > 0 ? (
              allFilteredBooks.map((book: any) => {
                const inStock = book.inStock;
                return (
                  <div
                    key={book._id}
                    className="relative group bg-white dark:bg-gray-900 rounded shadow transition-shadow duration-300 overflow-hidden"
                  >
                    <figure className="w-full h-52 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4 relative">
                      <img
                        src={book.imageURL[0]}
                        alt={book.title}
                        className="object-contain h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Add To Cart button inside the image area, centered */}
                      <button
                        onClick={() => handleAddBook(book)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 sm:bg-transparent sm:opacity-0 sm:group-hover:opacity-100 sm:pointer-events-none sm:group-hover:pointer-events-auto transition-opacity duration-300"
                      >
                        <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white text-sm font-medium rounded-md shadow flex items-center gap-2">
                          Add To Cart <IoMdCart className="text-lg" />
                        </span>
                      </button>
                    </figure>

                    <div className="p-4 text-center space-y-3">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                        {book.title}
                      </h2>
                      <p className="text-cyan-600 font-bold text-sm">
                        ${book.price}
                      </p>
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
              })
            ) : (
              <div className="flex justify-center items-center">
                <SkeletonLoading />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-wrap px-10 gap-4 py-2">
        <button
          onClick={handleViewMore}
          className=" px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Books;
