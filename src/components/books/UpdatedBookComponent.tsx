/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";

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
import SelectForm from "@/components/form/SelectForm";
import SelectDatePicker from "@/components/form/SelectDatePicker";

import { TResponse } from "@/types/type";
import { toast } from "sonner";
import {
  useGetSingleBookQuery,
  useUpdatebookMutation,
} from "@/redux/book/bookApi";
import { FaBook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";

const stockOption = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

const UpdatedBookComponent = () => {
  const { id } = useParams();
  const { data: singleBook } = useGetSingleBookQuery(id);

  const [updateBook] = useUpdatebookMutation();
  const { data: getCategory } = useGetAllcategoryQuery(undefined);
  const allcategory = getCategory?.data || [];

  const categoryOption = allcategory?.map((category: any) => ({
    label: category.name,
    value: category._id,
  }));

  const book = singleBook?.data;

  const form = useForm({
    defaultValues: {
      title: book?.title,
      author: book?.author,
      price: book?.price,
      inStock: book?.price,
      quantity: book?.price,
      category: book?.category,
      description: book?.description,
      publicationDate: book?.publicationDate,
      publisher: book?.publisher,
      imageURL: book?.imageURL,
    },
  });

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      title: data.title ? data.title : book?.title,
      author: data.author ? data.author : book?.author,
      price: data.price ? Number(data?.price) : book?.price,
      quantity: data.quantity ? Number(data?.quantity) : book?.quantity,
      inStock: data.inStock ? data?.inStock === "true" : book?.inStock,
      category: data.category ? data.category : book?.category,
      description: data.description ? data.description : book?.description,
      publicationDate: data.publicationDate
        ? data.publicationDate
        : book?.publicationDate,
      publisher: data.publisher ? data.publisher : book?.publisher,
      imageURL: data.imageURL ? data.imageURL : book?.imageURL,
    };

    try {
      const res = (await updateBook({
        id: id,
        data: formData,
      })) as TResponse<any>;
      console.log("updated res : ", res?.data?.message);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-5 px-4 sm:px-8 md:px-10 bg-white dark:bg-gray-900 min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 max-w-7xl mx-auto"
        >
          <div className=" text-center font-[inter] pt-8 ">
            <h2 className="text-3xl mb-2 text-cyan-500">
              -- <FaBook className="inline" /> Book Update{" "}
              <FaBook className="inline" /> --{" "}
            </h2>
            <p className="max-w-3/6 mx-auto dark:text-gray-300">
              Discover in-depth details about this book, including its author,
              category, price, and availability. Get insights into the story and
              why readers love it!
            </p>
          </div>

          <div className="grid font-[inter] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Book title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Author name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Book description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Category
                  </FormLabel>
                  <FormControl>
                    <SelectForm
                      options={categoryOption}
                      placeholder="Select category"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* In Stock */}
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    In Stock
                  </FormLabel>
                  <FormControl>
                    <SelectForm
                      options={stockOption}
                      placeholder="Select availability"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publication Date */}
            <FormField
              control={form.control}
              name="publicationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Publication Date
                  </FormLabel>
                  <FormControl>
                    <SelectDatePicker
                      value={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publisher */}
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Publisher
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Publisher name"
                      {...field}
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
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                      placeholder="Image URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <Button
              className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition"
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

export default UpdatedBookComponent;
