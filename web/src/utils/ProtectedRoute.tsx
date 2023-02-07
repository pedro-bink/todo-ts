import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  route?: string;
};

const ProtectedRoute = ({ route = '/' }: Props) => {
  if (!Cookies.get('authentication')) {
    return <Navigate to={route} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
