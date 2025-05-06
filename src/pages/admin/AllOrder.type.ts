export type TAllOrder = {
  _id: string;
  email: string;
  phone: number;
  index?: number;
  address: string;
  status: string;
  totalPrice: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  transaction: {
    id: string;
    method: string;
    date_time: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    transactionStatus: string | null;
  };
  product: {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    imageURL: string;
    price: number;
    quantity: number;
    inStock: boolean;
    publicationDate: string;
    publisher: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TOrder = {
  _id: string;
  email: string;
  orderId: string;
  date: string;
  status: string;
  quantity: number;
  totalAmount: number;
  method: string;
  productId: string;
  productName: string;
  index: number;
};
