import React from 'react';
import {  useSelector } from "react-redux";
import image from "../images/user.png";
import ThemeToggle from "../lib/ThemeToggle";
import { Link } from 'react-router-dom';

function TopNavbar() {
  const { Authuser } = useSelector((state) => state.auth);
  const role = Authuser?.role;
  const profilePathByRole = {
    manager: "/ManagerDashboard/Profilepage",
    admin: "/AdminDashboard/Profilepage",
    staff: "/StaffDashboard/Profilepage",
  };
  const profilePath = profilePathByRole[role] || "/LoginPage";
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className='sticky top-0 z-30'>
      <nav className='glass-card flex h-20 w-full items-center justify-between rounded-b-2xl px-6 shadow-sm'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-800'>Welcome, {Authuser?.name || "Guest"}</h1>
          <p className='text-sm text-slate-500'>{today}</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='rounded-xl border border-slate-200 bg-white px-3 py-2'>
            <ThemeToggle className='cursor-pointer text-xl text-slate-600' />
          </div>
          <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2'>
            <Link to={profilePath}>
              <img
                className="h-11 w-11 rounded-full border-2 border-teal-500 object-cover"
                src={Authuser?.ProfilePic || image}
                alt="Profile"
              />
            </Link>
            <div className='text-left'>
              <h1 className='text-sm font-semibold text-slate-800'>{Authuser?.name || "Guest"}</h1>
              <p className='text-xs capitalize text-slate-500'>{Authuser?.role || "Visitor"}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNavbar;