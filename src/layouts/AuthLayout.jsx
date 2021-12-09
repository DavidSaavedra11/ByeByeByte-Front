import React from 'react';
import { Outlet } from 'react-router';
// import fondoLogin from 'media/fondo1.jpg'

const AuthLayout = () => {
  return (
    <div className="imageLogin">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
