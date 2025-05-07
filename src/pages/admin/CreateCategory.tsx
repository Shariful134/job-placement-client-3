/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaBook } from "react-icons/fa";
import SelectForm from "@/components/form/SelectForm";

import { TResponse } from "@/types/type";
import { toast } from "sonner";

import { useCreatecategoryMutation } from "@/redux/category/categoryApi";
export type TCategory = {
  _id?: string;
  name: string;
  imageURL: string;
};

const FormSchema = z.object({
  name: z.string().nonempty({
    message: "name is Required",
  }),
  imageURL: z.string().nonempty({
    message: "imageURL is Required",
  }),
});

const categoryOption = [
  { value: "Fiction", label: "Fiction" },
  { value: "Science", label: "Science" },
  { value: "SelfDevelopment", label: "SelfDevelopment" },
  { value: "Poetry", label: "Poetry" },
  { value: "Religious", label: "Religious" },
];

const CreateCategory = () => {
  const [addCategory] = useCreatecategoryMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      imageURL: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = (await addCategory(data)) as TResponse<TCategory>;
      console.log("res: ", res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success("Category Created SuccessFully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" px-10 ">
      <div className=" text-center font-[inter] pt-8 pb-5 ">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaBook className="inline" /> Category Create{" "}
          <FaBook className="inline" /> --{" "}
        </h2>
        <p className="max-w-3/6 mx-auto">
          Create and manage book categories effortlessly. Categorizing books
          helps users explore content based on interests, genres, or
          themes—enhancing discoverability and user experience across your
          platform.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-lg space-y-6"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectForm
                      options={categoryOption}
                      placeholder="Select a Category"
                      onChange={field.onChange}
                    ></SelectForm>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ImageURL</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      placeholder="ImageURL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-center pb-5">
            {" "}
            <Button
              className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200 text-black"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategory;
