import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/authContext";
import PrivateComponent from "./PrivateComponent";
import { useUser } from "context/userContext";

const SidebarLinks = () => {
  const { userData } = useUser();
  const nameProfile = `${userData.nombre}`;
  const rolProfile = `${userData.rol}`;
  const profile = () => {
    return (
      <div>
        <div className="flex flex-col items-center text-green-500 font-extrabold">
          Hola!.. <br />
          <label className="text-xs text-yellow-400">
            {nameProfile.toUpperCase()}
          </label>
        </div>
        <div className="flex flex-col items-center text-xs font-extrabold text-black">
          Tu Rol
          <label className="text-xs text-green-900"> {rolProfile}</label>
        </div>
      </div>
    );
  };

  return (
    <ul className="mt-2">
      <SidebarRoute to="/profile" title={profile()} icon="fas fa-user" />
      <SidebarRoute to="" title="Inicio" icon="fas fa-home" />

      <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
        <SidebarRoute
          to="/usuarios"
          title="Usuarios"
          icon="fas fa-user-astronaut"
        />
      </PrivateComponent>
      <SidebarRoute
        to="/proyectos"
        title="Proyectos"
        icon="fas fa-space-shuttle"
      />
      <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
        <SidebarRoute
          to="/inscripciones"
          title="Aprobacion Inscripciones"
          icon="fas fa-meteor"
        />
      </PrivateComponent>
      {/* <SidebarRoute
        to="/avances"
        title="Avances"
        icon="fas fa-globe-americas"
      /> */}
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log("eliminar token");
    setToken("");
    localStorage.clear();
    window.location.reload(true);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to="/auth/login" className="sidebar-route text-black">
        <div className="flex items-center">
          <i className="fas fa-sign-out-alt" />
          <span className="font-bold text-lg  ml-4">Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className="py-3 w-full flex flex-col items-center justify-center">
      <img src="logo.png" alt="Logo" className="h-16" />
      <span className=" text-xl font-bold text-center">
        Gestor de Proyectos ByeByeByte
      </span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-r-4 border-t-4 rounded-r-xl border-red-600   flex flex-col md:flex-row flex-no-wrap md:h-full">
      {/* Sidebar starts */}

      <div className=" rounded-r-lg sidebar hidden md:flex">
        <div className="px-8">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className="flex md:hidden w-full justify-between bg-gray-800 p-2 text-white">
        <i
          className={`fas fa-${open ? "times" : "bars"}`}
          onClick={() => setOpen(!open)}
        />
        <i className="fas fa-home" />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className="sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out"
        id="mobile-nav"
      >
        <div className="px-8">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? " border-b-2 border-black  sidebar-route text-white bg-yellow-700 font-bold"
            : " bg-red-600 border-2 border-red-800 sidebar-route text-black-600 font-bold text-xl hover:text-white hover:bg-yellow-600"
        }
      >
        <div className="flex items-center">
          <i className={icon} />
          <span className="text-sm  ml-6">{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
