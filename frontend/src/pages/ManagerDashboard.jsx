import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="fixed left-0 top-0 z-40 h-full">
        <Sidebar />
      </div>

      <div className="min-h-screen pl-72 pr-5 pt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default ManagerDashboard;