/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useGetAllBooksQuery } from "../../redux/book/bookApi";
import { TBook, TUser } from "../../types/type";
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { useAppDispath, useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Input } from "@/components/ui/input";
import CategorySelect from "@/components/select/CategorySelect";
import Authorselect from "@/components/select/AuthorSelect";
import PriceSelect from "@/components/select/PriceSelect";
import InStockSelect from "@/components/select/InStockSelect";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";
import { TCategory } from "../admin/CreateCategory";

import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";
import { addBook } from "@/redux/cart/cartSlice";

const GetBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  // console.log(user);
  const admin = user?.role;

  const booksRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispath();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesSelect, setCategoriesSelect] = useState<string[]>([]);
  const [authorSelect, setAuthorSelect] = useState<string[]>([]);
  const [openFiltereing, setOpenFiltering] = useState<boolean>(false);
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
    ...new Set(allcategory?.map((category: TCategory) => category.name)),
  ] as string[];

  const authors = [
    ...new Set(allBooks?.map((book: TBook) => book.author)),
  ] as string[];
  console.log(allBooks);
  // search and filtering
  const allFilteredBooks = allBooks?.filter((book: any) => {
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

  const handleFiltering = () => {
    if (openFiltereing) {
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

  
  const handleAddBook = (book: TBook) => {
    dispatch(addBook(book));
  };

  //Handle pagination
  const totalBooks = allFilteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = allFilteredBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    booksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoriesSelect, authorSelect, pricesSelect, inStockSelect]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage - 1);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SkeletonLoading />
      </div>
    );
  }
  return (
    <div className="container mx-auto pt-10 mb-15 bg-[#fafafa] dark:bg-black">
      <div className=" text-center font-[inter]  px-10 pt-8">
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
      <div className="px-5 grid grid-cols-1 md:grid-cols-12 gap-5 mt-10">
        <div ref={booksRef} className=" col-span-1 md:col-span-3 lg:col-span-2">
          {!openFiltereing && (
            <button
              className="inline sm:hidden w-full px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              onClick={handleFiltering}
            >
              Show Filtering
            </button>
          )}
          {openFiltereing && (
            <div className="grid grid-cols-1 gap-5">
              <button
                className="inline sm:hidden w-full px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={handleFiltering}
              >
                Hide Filtering
              </button>
              <Input
                className="w-full border-gray-500 "
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
              <InStockSelect
                setInStockSelect={setInStockSelect}
              ></InStockSelect>
            </div>
          )}
          <div className=" hidden sm:grid grid-cols-1 gap-5">
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
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 bg-[#fafafa] dark:bg-black">
            {paginatedBooks.length > 0 ? (
              paginatedBooks?.map((book: TBook) => {
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
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          {/* =============previouse Button=============== */}
          <button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded-md text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          {/* =============next Button===================== */}
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GetBooks;
