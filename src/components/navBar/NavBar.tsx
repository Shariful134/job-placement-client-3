/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../assets/image/logo.png";
import { useAppDispath, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/type";
import { toast } from "sonner";
import { LiaRegistered } from "react-icons/lia";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdDashboardCustomize } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ModeToggle } from "../modeToggle/modeToggle";
import { orderBooksSelector, subtotalSelector } from "@/redux/cart/cartSlice";

const NavBar = () => {
  const { data: allData } = useGetAllcategoryQuery(undefined);
  const dispatch = useAppDispath();
  const navigate = useNavigate();
  const books = useAppSelector(orderBooksSelector);
  const subtotal = useAppSelector(subtotalSelector);

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const handlLogOut = () => {
    dispatch(logout());
    toast.success("LogOut SuccessFully!");
    navigate("/login");
    window.scrollTo(0, 0);
  };

  const categoryData = allData?.data?.map((name: any) => name.name);
  console.log("NavBarUser: ", user);
  return (
    <div className="  sticky top-0 z-10 w-full bg-slate-300 dark:bg-black">
      <div className="navbar container mx-auto px-4 font-serif ">
        {/* Navbar Start (Left Part) */}
        <div className="navbar-start w-[30%]">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-gray-900"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-bold  border-cyan-600 underline text-lg dark:text-gray-300"
                    : "hover:text-cyan-600 hover:underline text-lg"
                }
              >
                Home
              </NavLink>
              <div className="dropdown dropdown-hover">
                <label
                  tabIndex={0}
                  className="text-lg cursor-pointer hover:text-cyan-600 flex items-center dark:text-gray-300"
                >
                  Category{" "}
                  <RiArrowDropDownLine className=" text-2xl dark:text-gray-300" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 dark:text-gray-300 dark:bg-gray-900"
                >
                  {categoryData?.map((category: any, index: number) => (
                    <li key={index}>
                      <NavLink
                        to={`/category/details/${category}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-cyan-600 font-bold underline text-lg dark:text-gray-300"
                            : "hover:text-cyan-600 text-lg"
                        }
                      >
                        {category}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <NavLink
                to="/get-books"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                    : "hover:text-cyan-600 hover:underline text-lg"
                }
              >
                Book
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                    : "hover:text-cyan-600 hover:underline text-lg"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                    : "hover:text-cyan-600 hover:underline text-lg"
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                    : "hover:text-cyan-600 hover:underline text-lg"
                }
              >
                Contact
              </NavLink>
            </ul>
          </div>
          <img
            className="w-[100px] ms-2 hidden sm:block"
            src={logoImage}
            alt="logo"
          />
        </div>

        {/* Navbar Center (Only visible in large screen) */}
        <div className="navbar-end w-[70%] hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold  border-cyan-600 underline text-lg dark:text-gray-300"
                  : "hover:text-cyan-600 hover:underline text-lg dark:text-gray-300"
              }
            >
              Home
            </NavLink>
            <div className="dropdown dropdown-hover">
              <label
                tabIndex={0}
                className="text-lg cursor-pointer hover:text-cyan-600 flex items-center justify-center dark:text-gray-300"
              >
                Category{" "}
                <RiArrowDropDownLine className="dark:text-gray-300 text-2xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 dark:bg-gray-900 dark:text-gray-300"
              >
                {categoryData?.map((category: any, index: number) => (
                  <li key={index}>
                    <NavLink
                      to={`/category/details/${category}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-cyan-600 font-bold underline text-lg"
                          : "hover:text-cyan-600 text-lg"
                      }
                    >
                      {category}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <NavLink
              to="/get-books"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                  : "hover:text-cyan-600 hover:underline text-lg dark:text-gray-300"
              }
            >
              Book
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                  : "hover:text-cyan-600 hover:underline text-lg dark:text-gray-300"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                  : "hover:text-cyan-600 hover:underline text-lg dark:text-gray-300"
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold underline text-lg border-cyan-600 dark:text-gray-300"
                  : "hover:text-cyan-600 hover:underline text-lg dark:text-gray-300"
              }
            >
              Contact
            </NavLink>
          </ul>
        </div>
        {/* <div>
          <ModeToggle className />
        </div> */}
        {/* Navbar End (Right Part) */}
        <div
          className={`navbar-end w-full flex gap-4 ${
            user ? "lg:w-33" : "lg:w-42"
          } `}
        >
          {user ? (
            <div className="flex gap-2">
              {/* ==============cart================ */}
              {user.role === "user" && (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle dark:hover:bg-gray-900 dark:hover:text-gray-300 dark:border-1 dark:hover:border-gray-300"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />{" "}
                      </svg>
                      <span className="badge badge-sm indicator-item !px-1 dark:bg-gray-900 dark:text-gray-300 font-sans">
                        {books ? books?.length : 0}
                      </span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 dark:bg-gray-900 dark:text-gray-300  z-1 mt-3 w-52 shadow"
                  >
                    <div className="card-body font-sans">
                      <span className="text-lg font-bold">
                        {" "}
                        {books ? books?.length : 0} Items
                      </span>
                      <span className="text-cyan-600 font-bold font-sans">
                        Subtotal: ${subtotal}
                      </span>
                      <div className="card-actions">
                        <a
                          href="/my-cart"
                          className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                        >
                          View cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ==============ModeToggle================ */}
              <div>
                <ModeToggle />
              </div>

              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border-2 border-gray-400">
                    <img
                      alt="user"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dark:bg-rgay-900 menu-sm dropdown-content bg-base-100 dark:bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <p className="font-bold dark:text-gray-300">My Account</p>
                  <li className="dark:text-gray-300 dark:hover:bg-gray-700/25 rounded">
                    <a
                      href={`/${user?.role}/dashboard`}
                      className="text-sm dark:text-gray-300"
                    >
                      <CgProfile /> Profile
                    </a>
                  </li>

                  <li className="dark:text-gray-300 dark:hover:bg-gray-700/25 rounded">
                    <a href={`/${user?.role}/dashboard`} className="text-sm">
                      <MdDashboardCustomize /> Dashboard
                    </a>
                  </li>
                  {user ? (
                    <li className="dark:text-gray-300 dark:hover:bg-gray-700/25 rounded">
                      <button onClick={handlLogOut}>
                        <AiOutlineLogout /> LogOut
                      </button>
                    </li>
                  ) : (
                    <>
                      <li className="dark:text-gray-300 dark:hover:bg-gray-700/25 rounded">
                        <a href="/login">
                          <AiOutlineLogin /> Login
                        </a>
                      </li>
                      <li className="dark:text-gray-300 dark:hover:bg-gray-700/25 rounded">
                        <a href="/login">
                          <LiaRegistered /> Registration
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-5">
              <div>
                <ModeToggle />
              </div>
              <Button className="bg-slate-400 text-black text-lg hover:bg-slate-400">
                <a href="/login">Login</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
