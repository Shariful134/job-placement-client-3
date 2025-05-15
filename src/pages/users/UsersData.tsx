import SelectForm from "@/components/form/SelectForm";
import UserBlockModal from "@/components/modal/UserBlockModal";
import UserUnblockedModal from "@/components/modal/UserUnblockedModal";

import { SkeletonLoading } from "@/components/skeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
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
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "@/redux/user/userApi";
import { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";

type User = {
  _id?: string;
  name: string;
  email: string;
  isBlocked?: boolean;
  index: number;
};

const UsersData = () => {
  const { data: allData, isLoading } = useGetAllUserQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const invoices = allData?.data?.map((item: User, index: number) => ({
    _id: item._id,
    name: item?.name,
    email: item?.email,
    isBlocked: item?.isBlocked,
    index: index + 1,
  }));

  const options = [
    { value: "both", label: "Email & Name" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
  ];

  const filteredUsers = invoices?.filter((user: User) => {
    const search = searchTerm.toLowerCase();
    const matchName = user.name.toLowerCase().includes(search);
    const matchEmail = user.email.toLowerCase().includes(search);

    if (!selectedFilter || selectedFilter === "both") {
      return matchName || matchEmail;
    } else if (selectedFilter === "name") {
      return matchName;
    } else if (selectedFilter === "email") {
      return matchEmail;
    }
    return true;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage || 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="px-10 pt-18 ">
      <div className="text-center font-[inter] pb-10 pt-5">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaUserAstronaut className="inline" /> Users Data{" "}
          <FaUserAstronaut className="inline" /> --
        </h2>
        <p>
          Currently, we have a total of {allData?.data?.length || 0} registered
          users.
        </p>
      </div>

      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <SkeletonLoading />
        </div>
      ) : filteredUsers?.length === 0 ? (
        <h2 className="text-4xl text-center pb-5">No Data</h2>
      ) : (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
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
            <TableHeader>
              <TableRow className="dark:bg-gray-900">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-start">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers?.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    {user.index}. {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleDelete(user._id as string)}
                      className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                    >
                      Delete
                    </Button>
                    {user.isBlocked ? (
                      <UserUnblockedModal id={user._id} />
                    ) : (
                      <UserBlockModal id={user._id} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 gap-2">
            <Button
              className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
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
            <Button
              className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersData;
