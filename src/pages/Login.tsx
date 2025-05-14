/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispath } from "../redux/hooks";
import { useLoginMutation } from "../redux/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types/type";
import { setUser } from "../redux/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [addLogin] = useLoginMutation();

  const handleLogin = async (e: FieldValues) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const toastId = toast.loading("Loggin in");

    try {
      const res = await addLogin(data).unwrap();
      console.log(res);

      const user = verifyToken(res?.data?.accessToken) as TUser;
      console.log(user.role);

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 1000 });
      // navigate(`/${user.role}/Home`);
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 1000 });
    }
  };

  return (
    <div className="hero  min-h-screen px-10 bg-[#fafafa] dark:bg-black font-[inter]">
      <div className="hero-content flex-col">
        <div className="card  w-full max-w-sm shrink-0 shadow dark:bg-gray-900">
          <div className="card-body">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold">Login to Your Account</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Welcome back! Please enter your credentials
              </p>
            </div>
            <div className="mb-4 p-3 bg-slate-200 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                <strong>Demo Email:</strong> shariful@gmail.com
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                <strong>Demo Password:</strong> Shariful!23
              </p>
            </div>
            <fieldset className="fieldset font-[inter]">
              <form onSubmit={handleLogin}>
                <label className="fieldset-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input border-1 dark:text-gray-900 border-gray-300"
                  placeholder="Email"
                />
                <label className="fieldset-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input border-1 dark:text-gray-900 border-gray-300"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="px-4 mt-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                >
                  Login
                </button>
              </form>
              <span>
                Don't Have An Account? Please{" "}
                <Link to="/register" className="text-cyan-400 hover:underline">
                  Resitration
                </Link>
              </span>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
