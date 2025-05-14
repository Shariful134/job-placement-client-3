import { SkeletonDemo } from "@/components/skeleton/SkeletonDemo";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaUserAstronaut } from "react-icons/fa";
import { TCategory } from "./CreateCategory";
import {
  useDeletecategoryMutation,
  useGetAllcategoryQuery,
} from "@/redux/category/categoryApi";

import { AiOutlineDelete } from "react-icons/ai";
import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";
type ICategory = {
  id: string;
  name: string;
  imageURL: string;
  index: number;
};

const CategoryData = () => {
  const { data: allData, isLoading } = useGetAllcategoryQuery(undefined);
  const [deleteCategory] = useDeletecategoryMutation();

  const invoices = allData?.data?.map((item: TCategory, index: number) => ({
    id: item?._id,
    name: item?.name,
    imageURL: item?.imageURL,
    index: index + 1,
  }));

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading) {
    <div className="min-h-screen flex justify-center items-center">
      <SkeletonLoading />
    </div>;
  }
  return (
    <div className="px-10 pt-18 ">
      <div className=" text-center font-[inter] pb-10 pt-5">
        <h2 className="text-3xl mb-2  text-cyan-500">
          -- <FaUserAstronaut className="inline" /> Users Data{" "}
          <FaUserAstronaut className="inline" /> --{" "}
        </h2>
        <p>
          Currently, we have a total of {allData?.data?.length} registered
          users.
        </p>
      </div>
      {isLoading ? (
        <SkeletonDemo />
      ) : allData?.data?.length === 0 ? (
        <h2 className="text-4xl text-center pb-5">No Data</h2>
      ) : (
        <div>
          <Table className="font-[inter]">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow className="dark:bg-gray-900 bg-gray-300">
                <TableHead className="max-w-5/6 ">Name</TableHead>
                <TableHead>imageURL</TableHead>
                <TableHead className="text-start">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.length > 0 ? (
                invoices?.map((category: ICategory) => (
                  <TableRow key={category.index}>
                    <TableCell className="font-medium font-[inter]">
                      {category.index}. {category.name}
                    </TableCell>
                    <TableCell>{category.imageURL}</TableCell>
                    <TableCell>
                      <AiOutlineDelete
                        onClick={() => handleDelete(category.id)}
                        className="text-2xl hover:text-red-500 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No Data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CategoryData;
