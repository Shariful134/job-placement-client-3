import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../assets/image/logo.png";
import { useAppDispath, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/type";
import { toast } from "sonner";
import { IoMdSettings } from "react-icons/io";
import { LiaRegistered } from "react-icons/lia";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdDashboardCustomize } from "react-icons/md";

const NavBar = () => {
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
    <div className="  sticky top-0 z-10 w-full bg-slate-300">
      <div className="navbar container mx-auto px-4 font-serif ">
        {/* Navbar Start (Left Part) */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              <li>
                <NavLink to="/" className="hover:text-cyan-600">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/get-books" className="hover:text-cyan-600">
                  Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-cyan-600">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          <img className="w-[100px] ms-2" src={logoImage} alt="logo" />
        </div>

        {/* Navbar Center (Only visible in large screen) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold  border-cyan-600 underline text-lg"
                  : "hover:text-cyan-600 hover:underline text-lg"
              }
            >
              Home
            </NavLink>

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
          </ul>
        </div>

        {/* Navbar End (Right Part) */}
        <div className="navbar-end flex gap-4">
          {/* Cart Icon */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-8 stroke-[#24AAE4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17
                  m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item px-1 bg-rose-400">
                  8
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Avatar Dropdown */}
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

              <li>
                <a className="text-sm">
                  <IoMdSettings /> Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
