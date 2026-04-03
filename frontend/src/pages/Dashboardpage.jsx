import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Gettopproduct from "../lib/Gettopproduct";
import TopNavbar from "../Components/TopNavbar";
import { LuUsers } from "react-icons/lu";
import { staffUser, managerUser, adminUser } from "../features/authSlice";

function Dashboardpage() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userCards = [
    {
      title: "Staff Users",
      value: staffuser?.length || 0,
      iconClass: "text-cyan-500",
      ringClass: "bg-cyan-100",
    },
    {
      title: "Managers",
      value: manageruser?.length || 0,
      iconClass: "text-emerald-500",
      ringClass: "bg-emerald-100",
    },
    {
      title: "Admins",
      value: adminuser?.length || 0,
      iconClass: "text-rose-500",
      ringClass: "bg-rose-100",
    },
  ];

  useEffect(() => {
    dispatch(staffUser());
    dispatch(managerUser());
    dispatch(adminUser());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <TopNavbar />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-500">Operational snapshot for your inventory workspace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {userCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className={`inline-flex rounded-xl p-3 ${card.ringClass}`}>
                <LuUsers className={`text-2xl ${card.iconClass}`} />
              </div>
              <p className="mt-4 text-sm text-slate-500">{card.title}</p>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
          <Gettopproduct className="mt-2" />
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;