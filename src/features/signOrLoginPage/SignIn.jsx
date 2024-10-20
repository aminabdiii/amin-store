import { Link, useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import { useState } from "react";
import { Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { useSignInUser } from "./useSignInUser";

function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { signIn, isPending } = useSignInUser();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const password = watch("password");

  function onSubmit(values) {
    const { fullName, userName, email, password } = values;

    signIn(
      { fullName, userName, email, password },
      {
        onSuccess: () => {
          navigate("/home");
          reset();
        },
      },
    );
  }

  return (
    <section className="flex min-h-dvh w-full flex-col items-center gap-8 bg-gray-100 p-5 xs:justify-center">
      <div className="scale-125">
        <Logo />
      </div>

      <form
        className="relative z-10 mx-auto w-full max-w-sm rounded-lg bg-white p-5 shadow-md shadow-[#3f4bff]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#3f4bff]">Sign Up</h2>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div>
              <input
                type="text"
                className="w-full rounded border p-2 px-3 outline-none focus:ring-2 focus:ring-[#3f4bff]"
                placeholder="fullName"
                {...register("fullName", {
                  required: "fullName field is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only English letters are allowed!",
                  },
                })}
              />
              {errors["fullName"]?.message && (
                <span className="block px-3 py-1 text-xs font-medium text-red-400">
                  {errors["fullName"]?.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                className="w-full rounded border p-2 px-3 outline-none focus:ring-2 focus:ring-[#3f4bff]"
                placeholder="userName"
                {...register("userName", {
                  required: "userName field is required",
                  pattern: {
                    value: /^[A-Za-z0-9@]+$/,
                    message:
                      "Only English letters, numbers, and @ are allowed!",
                  },
                })}
              />
              {errors["userName"]?.message && (
                <span className="block px-3 py-1 text-xs font-medium text-red-400">
                  {errors["userName"]?.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                className="w-full rounded border p-2 px-3 outline-none focus:ring-2 focus:ring-[#3f4bff]"
                placeholder="Email address"
                {...register("email", {
                  required: "email field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address!",
                  },
                })}
              />
              {errors["email"]?.message && (
                <span className="block px-3 py-1 text-xs font-medium text-red-400">
                  {errors["email"]?.message}
                </span>
              )}
            </div>
            <div>
              <input
                type={isShowPassword ? "text" : "password"}
                className="w-full rounded border p-2 px-3 outline-none focus:ring-2 focus:ring-[#3f4bff]"
                placeholder="Password"
                {...register("password", {
                  required: "password field is required",
                  pattern: {
                    value: /^[A-Za-z0-9@]{8,}$$/,
                    message: "please enter a valid password!",
                  },
                })}
              />
              {errors["password"]?.message && (
                <span className="block px-3 py-1 text-xs font-medium text-red-400">
                  {errors["password"]?.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                className="w-full rounded border p-2 px-3 outline-none focus:ring-2 focus:ring-[#3f4bff]"
                placeholder="confirm Password"
                {...register("confirmPassword", {
                  required: "confirm password field is required",
                  validate: (value) =>
                    value === password ||
                    "Password & confirm password must be the same",
                })}
              />
              {errors["confirmPassword"]?.message && (
                <span className="block px-3 py-1 text-xs font-medium text-red-400">
                  {errors["confirmPassword"]?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex gap-1">
              <label htmlFor="show-password" className="cursor-pointer">
                show Password
              </label>
              <input
                id="show-password"
                name="showPassword"
                type="checkbox"
                value={isShowPassword}
                onChange={() => setIsShowPassword((show) => !show)}
                className="cursor-pointer accent-violet-500"
              />
            </div>
            <div>
              <Link to={"/login"}>Already have account?</Link>
            </div>
          </div>

          <button>
            <Button
              component="div"
              variant="contained"
              startIcon={<Login />}
              disabled={isPending}
              className={`w-full rounded-lg !bg-[#3f4bff] py-1 !font-montserrat !font-semibold !text-white active:!bg-[#3f4bff]${isPending ? "!cursor-wait opacity-50" : ""}`}
            >
              Sign In
            </Button>
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignIn;
