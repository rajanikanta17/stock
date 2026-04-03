import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { login } from "../features/authSlice";
import toast from "react-hot-toast";

function LoginPage() {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((payload) => {
        const role = payload?.user?.role;
        toast.success("Login successful");

        if (role === "staff") {
          navigator("/StaffDashboard");
        } else if (role === "admin") {
          navigator("/AdminDashboard");
        } else {
          navigator("/ManagerDashboard");
        }
      })
      .catch((error) => {
        const message = typeof error === "string" ? error : "Login failed";
        const normalized = message.toLowerCase();

        if (
          normalized.includes("does not exist") ||
          normalized.includes("no user") ||
          normalized.includes("password mismatch") ||
          normalized.includes("invalid credentials") ||
          normalized.includes("user and password mismatch")
        ) {
          toast.error("User and password mismatch");
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
            <p className="mb-3 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Welcome Back
            </p>
            <h1 className="text-4xl font-bold text-slate-900">Sign in to InventoryPro</h1>
            <p className="mt-2 text-slate-600">
              Continue managing stock, suppliers, and orders.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-rose-500">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-rose-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 p-3 font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:scale-[1.01]"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <p>
                Don&apos;t have an account?{" "}
                <Link to="/SignupPage" className="font-semibold text-teal-700 hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="inline-block rounded-full border border-cyan-500/40 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
              Control Center
            </p>
            <h2 className="mt-6 text-4xl font-bold leading-tight">
              Operate your warehouse with confidence.
            </h2>
            <p className="mt-4 text-slate-300">
              Track stock, monitor orders, and coordinate teams from one enterprise-grade dashboard.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Real-time updates</p>
              <p className="mt-2 text-2xl font-bold">24/7</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Accuracy</p>
              <p className="mt-2 text-2xl font-bold">99%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
