import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../assets/image/logo.png";
import { useAppDispath, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/type";
import { toast } from "sonner";
import { IoMdSettings } from "react-icons/io";
import { FaBookMedical, FaHistory } from "react-icons/fa";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
const NavBar = () => {
  const dispatch = useAppDispath();
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  // console.log(user);
  const admin = user?.role;
  console.log(admin);

  const handlLogOut = () => {
    dispatch(logout());
    toast.success("LogOut SuccessFully!");
    navigate("/login");
    window.scrollTo(0, 0);
  };
  return (
    <div className="navbar bg-gray-300 shadow-sm px-10 font-serif fixed z-1 ">
      <div className="flex-1">
        <img className=" w-[13%]" src={logoImage} alt="" />
      </div>
      <div className="flex justify-start me-2 ">
        <ul className="flex gap-5 text-black">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-cyan-600 font-bold border-b-2 border-cyan-600"
                : "hover:text-cyan-600"
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-cyan-600 font-bold border-b-2 border-cyan-600"
                : "hover:text-cyan-600"
            }
            to="/get-books"
          >
            <li>Book</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-cyan-600 font-bold border-b-2 border-cyan-600"
                : "hover:text-cyan-600"
            }
            to="/about"
          >
            <li>About</li>
          </NavLink>
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-8 stroke-[#24AAE4]"
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
              <span className="badge badge-sm indicator-item px-1 bg-rose-400">
                8
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end ms-5 ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border-2 border-gray-400">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <p className="font-bold">My Account</p>
            <li>
              <a>
                <CgProfile /> Profile
              </a>
            </li>
            <li>
              <a>
                <IoMdSettings /> Settings
              </a>
            </li>
            {user ? (
              <>
                {user.role == "user" && (
                  <li>
                    <a href="/get-order-histry">
                      <FaHistory /> Order History
                    </a>
                  </li>
                )}
                {admin === "admin" && (
                  <>
                    <li>
                      <a href="/users-all-orders">
                        <FaHistory /> All Order History
                      </a>
                    </li>
                    <li>
                      <a href="/users">
                        <FaHistory /> User History
                      </a>
                    </li>
                    <li>
                      <a href="/book-create">
                        <FaBookMedical /> Create Book
                      </a>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={handlLogOut}>
                    {" "}
                    <AiOutlineLogout />
                    LogOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">
                    <AiOutlineLogin /> Login
                  </a>
                </li>
                <li>
                  <a href="/register">Registration</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
