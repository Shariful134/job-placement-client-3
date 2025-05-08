import { TCategory } from "@/pages/admin/CreateCategory";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";
import { FaBook } from "react-icons/fa";

const Category = () => {
  const { data: allData } = useGetAllcategoryQuery(undefined);
  return (
    <div>
      <div className=" text-center font-[inter]">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaBook className="inline" /> Explore Our Top Categories{" "}
          <FaBook className="inline" /> --{" "}
        </h2>
        <p className="max-w-3/6 mx-auto font-[inter]">
          {" "}
          Dive into a handpicked collection of our best-selling book categories.
          From cutting-edge technology and personal growth to captivating
          fiction, there's something here for every reader.
        </p>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-30 my-10 pb-10">
        {allData?.data?.map((category: TCategory, index: number) => (
          <div key={index} className=" flex justify-center items-center">
            <a href="/#" className="group">
              <div className="w-40 h-40">
                <img
                  src={category?.imageURL}
                  alt="Category"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:border-slate-300"
                />
                <div className="cursor-pointer mt-5 bg-slate-300 text-black text-center text-sm font-medium py-2 rounded-sm border-white border-2">
                  {category?.name}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
