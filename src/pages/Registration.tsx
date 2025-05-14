/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/auth/authApi";
import { TResponse } from "../types/type";
import { toast } from "sonner";
import { useState } from "react";

const Registration = () => {
  const navigate = useNavigate();
  const [addRegisterUser] = useRegisterUserMutation();

  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, %, etc.)."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleRegister = async (e: FieldValues) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!validatePassword(data?.password as string)) return;

    try {
      const res = (await addRegisterUser(data)) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res?.data?.message);
        navigate("/login");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-[#fafafa] dark:bg-black font-[inter]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card  w-full max-w-sm shrink-0 shadow dark:bg-gray-900 ">
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Create an Account</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Join us today and start your journey
              </p>
            </div>
            <fieldset className="fieldset font-[inter]">
              <form onSubmit={handleRegister}>
                <label className="fieldset-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input dark:text-gray-900 border-1 border-gray-300"
                  placeholder="name"
                />
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input border-1 dark:text-gray-900 border-gray-300"
                  placeholder="Email"
                />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input border-1 dark:text-gray-900 border-gray-300"
                  placeholder="Password"
                />
                {passwordError && (
                  <p className="text-red-600">{passwordError}</p>
                )}

                <button
                  type="submit"
                  className="px-4 mt-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                >
                  Register
                </button>
              </form>
              <span>
                Have An Account? Please{" "}
                <Link to="/login" className=" text-cyan-400 hover:underline">
                  Login
                </Link>
              </span>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
