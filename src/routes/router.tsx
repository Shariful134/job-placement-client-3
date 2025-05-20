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
import Contact from "@/pages/contact/Contact";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardPage from "@/components/dashboard/Dashboard";
import CreateCategory from "@/pages/admin/CreateCategory";
import CategoryData from "@/pages/admin/CategoryData";
import AllBookData from "@/pages/admin/AllBooks";
import SingleCategoryData from "@/components/cateory/SingleCategoryData";
import BlogPage from "@/pages/blog/BlogPage";
import UserLayout from "@/components/layout/UserLayout";
import UserDashboardPage from "@/components/dashboard/UserDashboardPage"; // You can replace with your actual user dashboard component
import MyCart from "@/pages/cart/MyCart";

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
        path: "/blogs",
        element: <BlogPage></BlogPage>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/category/details/:category",
        element: <SingleCategoryData></SingleCategoryData>,
      },
      {
        path: "my-cart",
        element: (
          <ProtectedRoutes role="user">
            {" "}
            <MyCart></MyCart>
          </ProtectedRoutes>
        ),
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
        path: "/order-verify",
        element: (
          <ProtectedRoutes role="user">
            <VerifyOrder></VerifyOrder>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/get-orders/:order_id",
        element: (
          <ProtectedRoutes role="user">
            <OrdersData></OrdersData>
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
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
    ],
  },

  // Admin layout based routes
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "update-book",
        element: <UpdateBooks />,
      },
      {
        path: "get-AllbooksData",
        element: <AllBookData />,
      },
      {
        path: "order-history",
        element: <AllOrder></AllOrder>,
      },
      {
        path: "data-category",
        element: <CategoryData />,
      },
      {
        path: "user-history",
        element: <UsersData></UsersData>,
      },
      {
        path: "create-category",
        element: <CreateCategory></CreateCategory>,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "update-book/:id",
        element: <UpdateBooks />,
      },
      {
        path: "all-orders",
        element: <AllOrder />,
      },
      {
        path: "users",
        element: <UsersData />,
      },
    ],
  },

  // User layout based routes
  {
    path: "/user",
    element: (
      <ProtectedRoutes role="user">
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "get-order-histry",
        element: <OrderHistry />,
      },
      {
        path: "orders/:order_id",
        element: <OrdersData />,
      },
      {
        path: "verify-order",
        element: <VerifyOrder />,
      },
    ],
  },
]);

export default router;
