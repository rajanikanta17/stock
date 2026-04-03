import React from 'react';
import { Navigate } from 'react-router-dom';

const getDashboardPath = (role) => {
  switch (role) {
    case 'admin':
      return '/AdminDashboard';
    case 'manager':
      return '/ManagerDashboard';
    case 'staff':
      return '/StaffDashboard';
    default:
      return '/LoginPage';
  }
};

const ProtectedRoute = ({ element, allowedRoles }) => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return <Navigate to="/LoginPage" replace />;
  }

  let user = null;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    return <Navigate to="/LoginPage" replace />;
  }

  const role = user?.role;

  if (!role) {
    return <Navigate to="/LoginPage" replace />;
  }

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return element;
};

export default ProtectedRoute;
