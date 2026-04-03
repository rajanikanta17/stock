import React from "react";
import TopNavbar from "../Components/TopNavbar";

function AdminOnlyNotice({ pageName = "this page" }) {
  return (
    <div className="min-h-screen bg-base-100">
      <TopNavbar />
      <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-amber-900">Access Restricted</h1>
        <p className="mt-3 text-base text-amber-800">
          Only admin users can view the {pageName} page.
        </p>
        <p className="mt-2 text-sm text-amber-700">
          Please contact your administrator if you need access.
        </p>
      </div>
    </div>
  );
}

export default AdminOnlyNotice;
