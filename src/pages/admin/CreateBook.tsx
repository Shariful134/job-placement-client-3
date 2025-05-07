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
    <div className=" px-10 bg-[#fafafa]">
      <div className=" text-center font-[inter] pt-8 pb-5 ">
        <h2 className="text-3xl mb-2 text-cyan-500">
          -- <FaBook className="inline" /> Book Create{" "}
          <FaBook className="inline" /> --{" "}
        </h2>
        <p className="max-w-3/6 mx-auto">
          Discover in-depth details about this book, including its author,
          category, price, and availability. Get insights into the story and why
          readers love it!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className=" grid  sm:grid-cols-1 md:grid-cols-2  gap-x-5 gap-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      placeholder="title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      placeholder="author"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      type="number"
                      placeholder="price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectForm
                      options={categoryOption}
                      placeholder="select a Category"
                      onChange={field.onChange}
                    ></SelectForm>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      type="number"
                      placeholder="quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>InStock</FormLabel>
                  <FormControl>
                    <SelectForm
                      options={stockOption}
                      placeholder="select a Stock"
                      onChange={field.onChange}
                    ></SelectForm>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>PublicationDate</FormLabel>
                  <FormControl>
                    <SelectDatePicker
                      value={field.value}
                      onSelect={field.onChange}
                    ></SelectDatePicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      placeholder="publisher"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">
                Available Image URL
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
                        <FormLabel>imageURL {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
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

export default CreateBook;
