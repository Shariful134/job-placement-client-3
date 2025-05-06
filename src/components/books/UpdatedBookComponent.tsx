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

import { useParams } from "react-router-dom";

const stockOption = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

const categoryOption = [
  { value: "Fiction", label: "Fiction" },
  { value: "Science", label: "Science" },
  { value: "SelfDevelopment", label: "SelfDevelopment" },
  { value: "Poetry", label: "Poetry" },
  { value: "Religious", label: "Religious" },
];

const UpdatedBookComponent = () => {
  const { id } = useParams();
  const { data: singleBook } = useGetSingleBookQuery(id);

  const [updateBook] = useUpdatebookMutation();
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
    <div className="pt-16 px-10 bg-[#fafafa]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className=" grid font-[inter] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5">
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
              name="category"
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

            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      className="border-1 border-gray-400"
                      placeholder="imageURl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-center mb-2">
            {" "}
            <Button
              className="btn border-1 font-[inter] text-black rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200"
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
