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
      navigate(`/`);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 1000 });
    }
  };

  return (
    <div className="hero  min-h-screen px-10 bg-[#fafafa] font-[inter]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left font-[inter]">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset font-[inter]">
              <form onSubmit={handleLogin}>
                <label className="fieldset-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input border-1 border-gray-300"
                  placeholder="Email"
                />
                <label className="fieldset-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input border-1 border-gray-300"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="btn mt-2 border-1 font-[inter] rounded-md border-gray-600 bg-gray-100 hover:bg-gray-200mt-4"
                >
                  Login
                </button>
              </form>
              <span>
                Don't Have An Account? Please{" "}
                <Link to="/register" className="text-red-500 underline">
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
