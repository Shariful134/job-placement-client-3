/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { SkeletonDemo } from "@/components/skeleton/SkeletonDemo";
import {
  useDeletebookMutation,
  useGetAllBooksQuery,
} from "@/redux/book/bookApi";
import { TBookData } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AllBookData = () => {
  const { data: allBookData, isLoading } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeletebookMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className=" pt-18 ">
      {isLoading ? (
        <SkeletonDemo />
      ) : (
        <div>
          <div className=" text-center font-[inter] pb-10  pt-5">
            <h2 className="text-3xl mb-2  text-cyan-500">
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
              <div className="flex flex-wrap flex-start font-[inter]  gap-2 mb-5">
                <div className="w-60">
                  <Input
                    className="w-full border-1 border-gray-400 "
                    type="search"
                    value={searchTerm}
                    placeholder="Search here"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-60">
                  <SelectForm
                    options={options}
                    placeholder="Selecet"
                    onChange={setSelectedFilter}
                  ></SelectForm>
                </div>
              </div>
              <Table className="font-[inter]">
                <TableCaption></TableCaption>
                <TableHeader className="bg-gray-200 ">
                  <TableRow>
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
                  {filteredBooks?.length > 0 ? (
                    filteredBooks.map((book: any) => (
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
                            className="border-1 text-block rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
                          >
                            Delete
                          </Button>
                          {/* <Button className="border-1 text-block rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
                            Update
                          </Button> */}
                          <Link to={`/book-update/${book._id}`}>
                            <Button className="border-1 text-block rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200">
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBookData;
