import Sidebar from "components/Sidebar";
import { Outlet } from "react-router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useAuth } from "context/authContext";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


const PrivateLayout = () => {
  const navigate = useNavigate();
  const { authToken, setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [
    refreshToken,
    { data: dataMutation, loading: loadingMutation },
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.refreshToken.token) {
        setToken(dataMutation.refreshToken.token);
      } else {
        setToken(null);
        navigate("/auth/login");
      }
      setLoadingAuth(false);
    }
  }, [dataMutation, setToken, loadingAuth, navigate]);

  if (loadingMutation || loadingAuth) return <div>Loading...</div>;
  // h-screen flex-no-wrap
  return (
    <div className="flex flex-col md:flex-row h-screen w-full  ">
      <Sidebar />
      <div className="flex w-full h-full">
        <div className="w-full h-full  overflow-y-scroll flex-no-wrap">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
