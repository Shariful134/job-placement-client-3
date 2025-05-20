import { TBookData } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TBookCart extends TBookData {
  orderQuantity: number;
}

interface InitialState {
  books: TBookCart[];
}

const initialState: InitialState = {
  books: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // =================book add=====================
    addBook: (state, action) => {
      const addToBook = state.books.find(
        (book) => book?._id === action.payload._id
      );
      if (addToBook) {
        addToBook.orderQuantity += 1;
        return;
      }
      state.books.push({ ...action.payload, orderQuantity: 1 });
    },

    // =================Increament book=====================
    increamentOrderQuantity: (state, action) => {
      const bookToInreament = state.books.find(
        (book) => book._id === action.payload
      );

      if (bookToInreament) {
        bookToInreament.orderQuantity += 1;
        return;
      }
    },

    // =================Decreament book=====================
    decreamentOrderQuantity: (state, action) => {
      const bookToInreament = state.books.find(
        (book) => book._id === action.payload
      );

      if (bookToInreament && bookToInreament.orderQuantity > 1) {
        bookToInreament.orderQuantity -= 1;
        return;
      }
    },

    // =================Remoove book=====================
    remooveBook: (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
  },
});

export const orderBooksSelector = (state: RootState) => {
  return state.cart.books;
};

//  calculate subtotal
export const subtotalSelector = (state: RootState) => {
  const subtotal = state.cart.books.reduce((sum, product) => {
    return sum + product.price * product.orderQuantity;
  }, 0);

  return subtotal.toFixed(2);
};
export const {
  addBook,
  increamentOrderQuantity,
  decreamentOrderQuantity,
  remooveBook,
} = cartSlice.actions;
export default cartSlice.reducer;
