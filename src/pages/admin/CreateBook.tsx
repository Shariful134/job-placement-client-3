/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import SelectDatePicker from "@/components/form/SelectDatePicker";
import { useCreatebookMutation } from "@/redux/book/bookApi";
import { TBook, TResponse } from "@/types/type";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";

const FormSchema = z.object({
  categoryId: z.string().nonempty({ message: "CategoryId is required" }),
  title: z.string().nonempty({
    message: "title is Required",
  }),
  author: z.string().nonempty({
    message: "author is Required",
  }),
  price: z.number().min(1, {
    message: "price is Required",
  }),

  description: z.string().nonempty({
    message: "description is Required",
  }),
  quantity: z.number({
    message: "quantity is Required",
  }),
  inStock: z.string().nonempty({
    message: "inStock is Required",
  }),
  publicationDate: z.string().nonempty({
    message: "publicationDate is Required",
  }),
  publisher: z.string().nonempty({
    message: "publisher is Required",
  }),
  imageURL: z.array(
    z.object({
      value: z.string().nonempty({ message: "Image URL is required" }),
    })
  ),
});

const stockOption = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

const CreateBook = () => {
  const [addBook] = useCreatebookMutation();

  const { data: getCategory } = useGetAllcategoryQuery(undefined);
  const allcategory = getCategory?.data || [];

  const categoryOption = allcategory?.map((category: any) => ({
    label: category.name,
    value: category._id,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      author: "",
      price: 15.99,
      description: "",
      quantity: 36,
      inStock: "",
      publicationDate: "",
      publisher: "",
      imageURL: [{ value: "" }],
    },
  });

  const { append: appendImgUrl, fields: imageURLFields } = useFieldArray({
    control: form.control,
    name: "imageURL",
  });

  const addImageUrl = () => {
    appendImgUrl({ value: "" });
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      ...data,
      price: Number(data?.price),
      quantity: Number(data?.quantity),
      inStock: data?.inStock === "true",
      imageURL: data.imageURL.map((img) => img.value),
    };
    console.log(formData);
    console.log("formData: ", formData);
    try {
      const res = (await addBook(formData)) as TResponse<TBook>;
      console.log("res: ", res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success("Book Created SuccessFully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 bg-[#fafafa] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="text-center font-[inter] pt-4 pb-6">
        <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
          -- <FaBook className="inline" /> Book Create{" "}
          <FaBook className="inline" /> --
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          Discover in-depth details about this book, including its author,
          category, price, and availability. Get insights into the story and why
          readers love it!
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 font-[inter]"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      placeholder="Title"
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
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      placeholder="Author"
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
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
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
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
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
              name="categoryId"
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

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* InStock */}
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    In Stock
                  </FormLabel>
                  <FormControl>
                    <SelectForm
                      options={stockOption}
                      placeholder="Select Stock Status"
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
                  <FormLabel className="text-gray-800 dark:text-gray-200">
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
                  <FormLabel className="text-gray-800 dark:text-gray-200">
                    Publisher
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Publisher"
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image URL Array */}
          <div>
            <div className="flex justify-between items-center border-t border-b border-gray-300 dark:border-gray-600 py-3 my-5">
              <p className="text-primary font-bold text-xl dark:text-white">
                Available Image URLs
              </p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addImageUrl}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {imageURLFields.map((imageURLField, index) => (
                <div key={imageURLField.id}>
                  <FormField
                    control={form.control}
                    name={`imageURL.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200">
                          Image URL {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder={`https://...`}
                            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pb-5">
            <Button
              className="btn-style px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
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

export default CreateBook;
