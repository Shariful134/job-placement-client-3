import { useAppDispath, useAppSelector } from "@/redux/hooks";
import {
  decreamentOrderQuantity,
  increamentOrderQuantity,
  orderBooksSelector,
  remooveBook,
  subtotalSelector,
  TBookCart,
} from "@/redux/cart/cartSlice";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CartComponents = () => {
  const books = useAppSelector(orderBooksSelector);
  const subtotal = useAppSelector(subtotalSelector);
  console.log(subtotal);
  const dispatch = useAppDispath();
  console.log(books);
  const handleIncreament = (id: string) => {
    dispatch(increamentOrderQuantity(id));
  };

  const handleDecreament = (id: string) => {
    dispatch(decreamentOrderQuantity(id));
  };

  const handleRemoove = (id: string) => {
    dispatch(remooveBook(id));
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8 dark:bg-black dark:text-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-cyan-600 dark:text-cyan-400">
          Your Cart
        </h2>

        {books.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty.</p>
        ) : (
          <div className="grid gap-6">
            {books.map((book: TBookCart) => (
              <div
                key={book._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md max-w-xl container mx-auto"
              >
                <img
                  src={book.imageURL[0]}
                  alt={book.title}
                  className="w-24 h-32 object-contain"
                />

                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm">
                    Price:{" "}
                    <span className="text-cyan-600 font-bold">
                      ${book.price}
                    </span>
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      book.inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecreament(book._id)}
                    className="p-2 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {book.orderQuantity || 1}
                  </span>
                  <button
                    onClick={() => handleIncreament(book._id)}
                    className="p-2 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() => handleRemoove(book._id)}
                  className="p-2 cursor-pointer rounded-full bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-700 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponents;
