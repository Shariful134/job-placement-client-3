
import Details from "../books/Details";

import UpdatedBookComponent from "@/components/books/UpdatedBookComponent";

const UpdateBooks = () => {
  return (
    <div className="pt-10 bg-[#fafafa] dark:bg-black">
      <div className="flex justify-center">
        <UpdatedBookComponent></UpdatedBookComponent>
      </div>
      <Details></Details>
    </div>
  );
};

export default UpdateBooks;
