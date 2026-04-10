import React from "react";
import { Link } from "react-router-dom";

function getDashboardPathByRole(role) {
  switch (role) {
    case "admin":
      return "/AdminDashboard";
    case "manager":
      return "/ManagerDashboard";
    case "staff":
      return "/StaffDashboard";
    default:
      return "/";
  }
}

function NotFoundPage() {
  let role = null;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    role = user?.role || null;
  } catch (error) {
    role = null;
  }

  const dashboardPath = getDashboardPathByRole(role);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-3xl items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Error 404</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Route not found</h1>
          <p className="mt-3 text-slate-600">
            The page you requested is unavailable or the URL is incorrect.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={dashboardPath}
              className="rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-700/20 transition hover:scale-[1.01]"
            >
              Go to dashboard
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;