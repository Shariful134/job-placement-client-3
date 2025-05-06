import { createBrowserRouter } from "react-router";
import App from "../App";
import GetBooks from "../pages/books/GetBooks";
import Home from "../pages/home/Home";
import Details from "../pages/books/Details";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import UpdateBooks from "@/pages/admin/UpdateBooks";
import CreateBook from "@/pages/admin/CreateBook";

import ProtectedRoutes from "@/components/layout/ProtectedRoutes";
import About from "@/pages/about/About";

import UsersData from "@/pages/users/UsersData";
import Order from "@/pages/order/Order";
import VerifyOrder from "@/pages/order/VerifyOrder";
import OrdersData from "@/pages/order/OrdersData";
import OrderHistry from "@/pages/order/OrderHistry";
import AllOrder from "@/pages/admin/AllOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/get-books",
        element: <GetBooks></GetBooks>,
      },
      {
        path: "/book-details/:id",
        element: <Details></Details>,
      },
      {
        path: "/book-order/:id",
        element: (
          <ProtectedRoutes role="user">
            <Order></Order>
          </ProtectedRoutes>
        ),
      },
      {
        path: "order-verify",
        element: (
          <ProtectedRoutes role="user">
            <VerifyOrder></VerifyOrder>
          </ProtectedRoutes>
        ),
      },
      {
        path: "get-orders/:order_id",
        element: (
          <ProtectedRoutes role="user">
            <OrdersData></OrdersData>
          </ProtectedRoutes>
        ),
      },
      {
        path: "get-order-histry",
        element: (
          <ProtectedRoutes role="user">
            <OrderHistry></OrderHistry>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoutes role="admin">
            <UsersData></UsersData>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/users-all-orders",
        element: (
          <ProtectedRoutes role="admin">
            <AllOrder></AllOrder>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/book-update/:id",
        element: (
          <ProtectedRoutes role="admin">
            <UpdateBooks></UpdateBooks>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/book-create",
        element: (
          <ProtectedRoutes role="admin">
            <CreateBook></CreateBook>
          </ProtectedRoutes>
        ),
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
