import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Gettopproduct from "../lib/Gettopproduct";
import TopNavbar from "../Components/TopNavbar";
import { LuUsers, LuClock, LuActivity } from "react-icons/lu"; // Icons for activity logs
import { getrecentActivityLogs } from "../features/activitySlice";
import { staffUser, managerUser, adminUser } from "../features/authSlice";
import FormattedTime from "../lib/FormattedTime";
import socket from "../lib/socket";

function Dashboardpage() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);
  const { recentuser } = useSelector((state) => state.activity);
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
    dispatch(getrecentActivityLogs());

    // Listen for new activity logs
    socket.on("newActivityLog", (newLog) => {
      console.log("New activity log:", newLog);
      // Optionally, update the UI or refetch logs
    });

    return () => {
      socket.off("newActivityLog"); // Clean up the listener
    };
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

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Recent Activity</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentuser?.length > 0 ? (
            recentuser.map((logs) => (
              <div
                key={logs._id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="rounded-full bg-cyan-100 p-3">
                    <LuActivity className="text-2xl text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{logs.userId.name || "Unknown User"}</h2>
                    <p className="text-sm text-slate-500">{logs.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <LuClock className="text-slate-500" />
                  <FormattedTime timestamp={logs.createdAt} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No recent activity logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;