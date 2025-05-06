import SelectForm from "@/components/form/SelectForm";
import UserBlockModal from "@/components/modal/UserBlockModal";
import UserDeleteModal from "@/components/modal/UserDeleteModal";
import UserUnblockedModal from "@/components/modal/UserUnblockedModal";
import { SkeletonDemo } from "@/components/skeleton/SkeletonDemo";
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
import { useGetAllUserQuery } from "@/redux/user/userApi";
import { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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
    const SearchData = searchTerm
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    if (!selectedFilter || selectedFilter === "both") {
      return SearchData;
    } else if (selectedFilter === "name") {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (selectedFilter === "email") {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="px-10 pt-18 bg-[#d9cbb7]">
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
          <div className="flex flex-wrap flex-start font-[inter] gap-2">
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
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-5/6">Name</TableHead>
                <TableHead>Email</TableHead>

                <TableHead className="text-start">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.length > 0 ? (
                filteredUsers?.map((user: User) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium font-[inter]">
                      {user.index}. {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="flex flex-wrap  gap-2">
                      <UserDeleteModal id={user._id}></UserDeleteModal>
                      {user?.isBlocked ? (
                        <UserUnblockedModal id={user._id}></UserUnblockedModal>
                      ) : (
                        <UserBlockModal id={user._id}></UserBlockModal>
                      )}
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

export default UsersData;
