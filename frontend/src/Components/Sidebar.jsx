import React from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { RiStockLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdPointOfSale, MdOutlineCategory } from "react-icons/md";
import { TfiSupport } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxActivityLog, RxDashboard } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import toast from 'react-hot-toast';
import { LuUsers } from "react-icons/lu";
import logo1 from '../images/logo1.png'

function Sidebar() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { Authuser } = useSelector((state) => state.auth); 
  const role = Authuser?.role;

  const basePathByRole = {
    manager: "/ManagerDashboard",
    admin: "/AdminDashboard",
    staff: "/StaffDashboard",
  };

  const basePath = basePathByRole[role] || "/ManagerDashboard";

  const menuByRole = {
    manager: [
      { label: "Product", icon: <AiOutlineProduct className="text-lg" />, to: `${basePath}/product` },
      { label: "Activity Log", icon: <RxActivityLog className="text-lg" />, to: `${basePath}/activity-log` },
      { label: "Supplier", icon: <TfiSupport className="text-lg" />, to: `${basePath}/supplier` },
      { label: "Sales", icon: <MdPointOfSale className="text-lg" />, to: `${basePath}/sales` },
      { label: "Stock Transaction", icon: <RiStockLine className="text-lg" />, to: `${basePath}/stock-transaction` },
      { label: "Notifications", icon: <IoNotificationsOutline className="text-lg" />, to: `${basePath}/NotificationPageRead` },
      { label: "Category", icon: <MdOutlineCategory className="text-lg" />, to: `${basePath}/category` },
    ],
    admin: [
      { label: "Product", icon: <AiOutlineProduct className="text-lg" />, to: `${basePath}/product` },
      { label: "Activity Log", icon: <RxActivityLog className="text-lg" />, to: `${basePath}/activity-log` },
      { label: "Supplier", icon: <TfiSupport className="text-lg" />, to: `${basePath}/supplier` },
      { label: "Sales", icon: <MdPointOfSale className="text-lg" />, to: `${basePath}/sales` },
      { label: "Stock Transaction", icon: <RiStockLine className="text-lg" />, to: `${basePath}/stock-transaction` },
      { label: "Create Notifications", icon: <IoNotificationsOutline className="text-lg" />, to: `${basePath}/notifications` },
      { label: "Category", icon: <MdOutlineCategory className="text-lg" />, to: `${basePath}/category` },
      { label: "Users", icon: <LuUsers className="text-lg" />, to: `${basePath}/Userstatus` },
    ],
    staff: [
      { label: "Product", icon: <AiOutlineProduct className="text-lg" />, to: `${basePath}/product` },
      { label: "Sales", icon: <MdPointOfSale className="text-lg" />, to: `${basePath}/sales` },
      { label: "Stock Transaction", icon: <RiStockLine className="text-lg" />, to: `${basePath}/stock-transaction` },
      { label: "Notifications", icon: <IoNotificationsOutline className="text-lg" />, to: `${basePath}/NotificationPageRead` },
    ],
  };

  const roleMenu = menuByRole[role] || [];

  const navClass = ({ isActive }) =>
    `sidebar-nav-item group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? "sidebar-nav-item-active bg-teal-600 text-white shadow-md"
        : "sidebar-nav-item-idle text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const handleLogout = async () => {
    dispatch(logout())
      .then(() => {
        toast.success("Logout successfully");
        navigator('/');
      })
      .catch((error) => {
        toast.error("Error in logout");
      });
  };

  return (
    <aside className="sidebar-shell flex h-screen w-72 flex-col border-r border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur">
      <div className="sidebar-logo-box rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <img src={logo1} className='sidebar-logo-image mx-auto w-2/3 rounded-lg bg-white p-2' alt="inventory logo" />
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-teal-700 to-cyan-700 px-4 py-3 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">Workspace</p>
        <p className="mt-1 text-base font-semibold capitalize">{role || "manager"} portal</p>
      </div>

      <nav className="mt-6 flex-1 space-y-1 overflow-auto pr-1">
        <NavLink to={basePath} end className={navClass}>
          <RxDashboard className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        {roleMenu.map((item) => (
          <NavLink key={item.to} to={item.to} className={navClass}>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-logout-btn flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-rose-50 hover:text-rose-700"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
