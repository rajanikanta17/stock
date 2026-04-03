import React, { useEffect } from "react";
import TopNavbar from "../Components/TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import image from "../images/user.png";
import {
  staffUser,
  managerUser,
  adminUser,
  removeusers,
  updateUserRole
} from "../features/authSlice";
import toast from "react-hot-toast";
import UserRoleChart from "../lib/Usersgraph";

function Userstatus() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { Authuser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(staffUser());
    dispatch(managerUser());
    dispatch(adminUser());
  }, [dispatch]);

  


  const handleremove=async(UserId)=>{

    dispatch(removeusers(UserId))
    .unwrap()
    .then(()=>{
      dispatch(staffUser());
      dispatch(managerUser());
      dispatch(adminUser());
      toast.success("user remove successffully")
    })
    .catch((err)=>{
      toast.error(err || "error in remove user")
    })

  }

  const handlePromote = async (UserId, role) => {
    dispatch(updateUserRole({ UserId, role }))
      .unwrap()
      .then(() => {
        dispatch(staffUser());
        dispatch(managerUser());
        dispatch(adminUser());
        toast.success(`User promoted to ${role}`);
      })
      .catch((err) => {
        toast.error(err || "error in role update");
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <TopNavbar />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Admin</p>
            <h1 className="text-2xl font-semibold">User Status</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage roles, access, and promotions.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Managers: {manageruser?.length || 0}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Admins: {adminuser?.length || 0}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Staff: {staffuser?.length || 0}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
              <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <h2 className="text-base font-semibold">Managers</h2>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {manageruser?.length || 0}
                </span>
              </header>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {manageruser?.length > 0 ? (
                  manageruser.map((user, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-4 px-5 py-4">
                      <img
                        src={user?.ProfilePic || image}
                        alt={user?.name || "User"}
                        className="h-12 w-12 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                      />
                      <div className="min-w-[160px]">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePromote(user._id, "admin")}
                          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                        >
                          Promote Admin
                        </button>
                        <TiDelete
                          onClick={() => handleremove(user._id)}
                          className="text-2xl text-rose-500 transition hover:text-rose-600"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">No users available.</p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
              <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <h2 className="text-base font-semibold">Admin Users</h2>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {adminuser?.length || 0}
                </span>
              </header>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {adminuser?.length > 0 ? (
                  adminuser.map((user, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-4 px-5 py-4">
                      <img
                        src={user?.ProfilePic || image}
                        alt={user?.name || "User"}
                        className="h-12 w-12 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                      />
                      <div className="min-w-[160px]">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                      <div className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Admin
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">No users available.</p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
              <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <h2 className="text-base font-semibold">Staff Users</h2>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {staffuser?.length || 0}
                </span>
              </header>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {staffuser?.length > 0 ? (
                  staffuser.map((user, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-4 px-5 py-4">
                      <img
                        src={user?.ProfilePic || image}
                        alt={user?.name || "User"}
                        className="h-12 w-12 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                      />
                      <div className="min-w-[160px]">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                      <div className="ml-auto flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePromote(user._id, "manager")}
                          className="rounded-lg bg-cyan-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600"
                        >
                          Promote Manager
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePromote(user._id, "admin")}
                          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                        >
                          Promote Admin
                        </button>
                        <TiDelete
                          onClick={() => handleremove(user._id)}
                          className="text-2xl text-rose-500 transition hover:text-rose-600"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">No users available.</p>
                )}
              </div>
            </section>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-semibold">Role Distribution</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Current breakdown of user roles.</p>
            <div className="mt-6">
              <UserRoleChart className="h-72 w-full" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Userstatus;
