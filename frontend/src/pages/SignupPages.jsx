import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

function SignupPage() {
  const { isUserSignup } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: yup.string().oneOf(["staff"]).required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "staff",
    },
  });

  const onSubmit = (data) => {
    dispatch(signup(data))
      .unwrap()
      .then(() => {
        toast.success("Signup successful");
        navigator("/StaffDashboard");
      })
      .catch((error) => {
        const message = typeof error === "string" ? error : "Signup failed";

        if (message.toLowerCase().includes("already registered")) {
          toast.error("User is already registered");
          return;
        }

        toast.error(message);
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto grid min-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200 lg:grid-cols-2">
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <p className="mb-3 inline-block rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Create Account
            </p>
            <h1 className="text-4xl font-bold text-slate-900">Join InventoryPro</h1>
            <p className="mt-2 text-slate-600">
              Get role-based access to products, orders, and inventory insights.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="mb-5">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-rose-500">{errors.name.message}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-rose-500">{errors.email.message}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-rose-500">{errors.password.message}</p>
                )}
              </div>

              <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
              <select
                {...register("role")}
                className="mb-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-cyan-500"
                disabled
              >
                <option value="staff">Staff</option>
              </select>
              {errors.role && <p className="mb-4 text-sm text-rose-500">{errors.role.message}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 p-3 font-semibold text-white shadow-lg shadow-cyan-700/25 transition hover:scale-[1.01]"
              >
                {isUserSignup ? "Signing..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <p>
                Already have an account?{" "}
                <Link to="/LoginPage" className="font-semibold text-cyan-700 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-12 right-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative z-10">
            <p className="inline-block rounded-full border border-cyan-500/40 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
              Role Based Platform
            </p>
            <h2 className="mt-6 text-4xl font-bold leading-tight">Set up your workspace in minutes.</h2>
            <p className="mt-4 text-slate-300">
              Choose your role and start with a dashboard tailored for your daily responsibilities.
            </p>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">
              Teams using structured inventory workflows reduce stock issues and improve fulfillment performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
