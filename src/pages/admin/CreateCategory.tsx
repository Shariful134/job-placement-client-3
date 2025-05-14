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
    <div className="px-4 sm:px-6 md:px-10 py-10 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center font-[inter] pt-4 pb-6">
        <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
          -- <FaBook className="inline" /> Category Create{" "}
          <FaBook className="inline" /> --
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          Create and manage book categories effortlessly. Categorizing books
          helps users explore content based on interests, genres, or
          themes—enhancing discoverability and user experience across your
          platform.
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto space-y-6 font-[inter]"
        >
          {/* Category Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 dark:text-gray-200">
                  Category
                </FormLabel>
                <FormControl>
                  <SelectForm
                    options={categoryOption}
                    placeholder="Select a Category"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL */}
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 dark:text-gray-200">
                  Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter image URL"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
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
