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
import SelectDatePicker from "@/components/form/SelectDatePicker";
import { useCreatebookMutation } from "@/redux/book/bookApi";
import { TBook, TResponse } from "@/types/type";
import { toast } from "sonner";

const FormSchema = z.object({
  title: z.string().nonempty({
    message: "title is Required",
  }),
  author: z.string().nonempty({
    message: "author is Required",
  }),
  price: z.number().min(1, {
    message: "price is Required",
  }),
  category: z.string().nonempty({
    message: "category is Required",
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
  imageURL: z.string().nonempty({
    message: "imageURL is Required",
  }),
});

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

const CreateBook = () => {
  const [addBook] = useCreatebookMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      price: 15.99,
      category: "",
      description: "",
      quantity: 36,
      inStock: "",
      publicationDate: "",
      publisher: "",
      imageURL: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = {
      ...data,
      price: Number(data?.price),
      quantity: Number(data?.quantity),
      inStock: data?.inStock === "true",
    };
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
    <div className="pt-16 px-10 bg-[#fafafa]">
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
          <div className=" grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5">
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
