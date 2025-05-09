/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout, useCurrentToken } from "@/redux/auth/authSlice";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";
import { useAppDispath, useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/type";
import { verifyToken } from "@/utils/verifyToken";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LiaRegistered } from "react-icons/lia";
import { MdDashboardCustomize } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SiteHeader() {
  const { data: allData } = useGetAllcategoryQuery(undefined);
  const categoryData = allData?.data?.map((name: any) => name.name);
  const dispatch = useAppDispath();
  const navigate = useNavigate();

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

  return (
    <header className="sticky top-0 z-50 bg-gray-300  flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1  lg:gap-2 lg:px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="w-full">
          <div className="navbar font-serif">
            {/* Navbar Start (Left Part) */}
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <NavLink
                    to="/get-books"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                        : "hover:text-cyan-600 hover:underline text-lg"
                    }
                  >
                    Book
                  </NavLink>
                  <div className="dropdown dropdown-hover">
                    <label
                      tabIndex={0}
                      className="text-lg cursor-pointer hover:text-cyan-600 flex items-center "
                    >
                      Category <RiArrowDropDownLine className=" text-2xl" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {categoryData?.map((category: any) => (
                        <li>
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
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                        : "hover:text-cyan-600 hover:underline text-lg"
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/blogs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                        : "hover:text-cyan-600 hover:underline text-lg"
                    }
                  >
                    Blog
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                        : "hover:text-cyan-600 hover:underline text-lg"
                    }
                  >
                    Contact
                  </NavLink>
                </ul>
              </div>
            </div>

            {/* Navbar Center (Only visible in large screen) */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 text-black gap-5">
                <NavLink
                  to="/get-books"
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                      : "hover:text-cyan-600 hover:underline text-lg"
                  }
                >
                  Book
                </NavLink>
                <div className="dropdown dropdown-hover">
                  <label
                    tabIndex={0}
                    className="text-lg cursor-pointer hover:text-cyan-600 flex items-center "
                  >
                    Category <RiArrowDropDownLine className=" text-2xl" />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {categoryData?.map((category: any) => (
                      <li>
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
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                      : "hover:text-cyan-600 hover:underline text-lg"
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                      : "hover:text-cyan-600 hover:underline text-lg"
                  }
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-600 font-bold underline text-lg border-cyan-600"
                      : "hover:text-cyan-600 hover:underline text-lg"
                  }
                >
                  Contact
                </NavLink>
              </ul>
            </div>
            {/* Navbar End (Right Part) */}
            <div className="navbar-end w-full lg:w-14 flex gap-4">
              {user ? (
                <div className="dropdown dropdown-end">
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
                    className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <p className="font-bold ">My Account</p>
                    <li>
                      <a href={`/${user?.role}/dashboard`} className="text-sm">
                        <CgProfile /> Profile
                      </a>
                    </li>

                    <li>
                      <a href={`/${user?.role}/dashboard`} className="text-sm">
                        <MdDashboardCustomize /> Dashboard
                      </a>
                    </li>
                    {user ? (
                      <li>
                        <button onClick={handlLogOut}>
                          <AiOutlineLogout /> LogOut
                        </button>
                      </li>
                    ) : (
                      <>
                        <li>
                          <a href="/login">
                            <AiOutlineLogin /> Login
                          </a>
                        </li>
                        <li>
                          <a href="/login">
                            <LiaRegistered /> Registration
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              ) : (
                <Button className="bg-slate-400 text-black text-lg hover:bg-slate-400">
                  <a href="/login">Login</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
