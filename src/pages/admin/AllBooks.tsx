/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SelectForm from "@/components/form/SelectForm";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaBook } from "react-icons/fa";

import {
  useDeletebookMutation,
  useGetAllBooksQuery,
} from "@/redux/book/bookApi";
import { TBookData } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";

const AllBookData = () => {
  const { data: allBookData, isLoading } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeletebookMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Default items per page

  console.log("allBookData :", allBookData?.data);
  const invoices = allBookData?.data?.map((item: TBookData, index: number) => ({
    index: index + 1,
    _id: item._id,
    title: item.title,
    author: item.author,
    description: item.description,
    price: item.price,
    quantity: item.quantity,
    inStock: item.inStock,
    publisher: item.publisher,
    publicationDate: item.publicationDate,
    categoryName: item.categoryId?.name,
  }));

  const options = [
    { value: "both", label: "Title & Author" },
    { value: "name", label: "Title" },
    { value: "email", label: "Author" },
  ];

  const filteredBooks = invoices?.filter((book: TBookData) => {
    const search = searchTerm.toLowerCase();
    const matchTitle = book.title.toLowerCase().includes(search);
    const matchAuthor = book.author.toLowerCase().includes(search);

    if (!selectedFilter || selectedFilter === "both") {
      return matchTitle || matchAuthor;
    } else if (selectedFilter === "name") {
      return matchTitle;
    } else if (selectedFilter === "email") {
      return matchAuthor;
    }
  });

  // Pagination Logic: Slice the filteredBooks to get only the current page's items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((filteredBooks?.length || 0) / itemsPerPage);

  if (isLoading) {
    <div className="min-h-screen flex justify-center items-center">
      <SkeletonLoading />
    </div>;
  }
  return (
    <div className="pt-5">
      <div className="mb-10 ">
        <div className="text-center font-[inter] pb-10 ">
          <h2 className="text-3xl mb-2 text-cyan-500">
            -- <FaBook className="inline" /> All Books Data{" "}
            <FaBook className="inline" /> --{" "}
          </h2>
          <p>
            Currently, we have a total of {allBookData?.data?.length} Books of
            Current Time.
          </p>
        </div>

        {!invoices || invoices.length === 0 ? (
          <h2 className="text-4xl text-center pb-5">No Data Found!</h2>
        ) : (
          <div>
            <div className="flex flex-wrap flex-start font-[inter] gap-2 mb-5">
              <div className="w-60">
                <Input
                  className="w-full border-1 border-gray-400"
                  type="search"
                  value={searchTerm}
                  placeholder="Search here"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-60">
                <SelectForm
                  options={options}
                  placeholder="Select"
                  onChange={setSelectedFilter}
                />
              </div>
            </div>

            <Table className="font-[inter]">
              <TableCaption></TableCaption>
              <TableHeader className="bg-gray-200">
                <TableRow className="dark:bg-gray-900">
                  <TableHead></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead>Publisher</TableHead>
                  <TableHead>Publication Date</TableHead>
                  <TableHead className="text-start">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBooks?.length > 0 ? (
                  paginatedBooks.map((book: any) => (
                    <TableRow key={book._id}>
                      <TableCell>{book.index}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.categoryName}</TableCell>
                      <TableCell>{book.price} BDT</TableCell>
                      <TableCell>{book.quantity}</TableCell>
                      <TableCell>{book.inStock ? "Yes" : "No"}</TableCell>
                      <TableCell>{book.publisher}</TableCell>
                      <TableCell>
                        {new Date(book.publicationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          onClick={() => handleDelete(book._id)}
                          className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                        >
                          Delete
                        </Button>
                        <Link to={`/book-update/${book._id}`}>
                          <Button className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                            Update
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10}>No Data Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <Button
                className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "bg-cyan-500 text-white"
                      : "bg-cyan-100 text-black"
                  }
                >
                  {index + 1}
                </Button>
              ))}
              {/* <span>
                  Page {currentPage} of {totalPages}
                </span> */}
              <Button
                className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookData;
