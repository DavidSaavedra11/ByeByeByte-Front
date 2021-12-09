import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/authContext";
// import PrivateComponent from "./PrivateComponent";


const SidebarLinks = () => {
  return (
    <ul className="mt-6">
      <SidebarRoute to="" title="Inicio" icon="fas fa-home" />

      <SidebarRoute
        to="/usuarios"
        title="Usuarios"
        icon="fas fa-user-astronaut"
      />
      <SidebarRoute to="/page2" title="Proyectos" icon="fas fa-space-shuttle" />
      <SidebarRoute
        to="/category1"
        title="Inscripciones"
        icon="fas fa-meteor"
      />
      <SidebarRoute
        to="/category1/page1"
        title="Avances"
        icon="fas fa-globe-americas"
      />
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log("eliminar token");
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to="/auth/login" className="sidebar-route text-red-700">
        <div className="flex items-center">
          <i className="fas fa-sign-out-alt" />
          <span className="text-sm  ml-2">Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};


const Logo = () => {
  return (
    <div className="py-3 w-full flex flex-col items-center justify-center">
      <img src="logo.png" alt="Logo" className="h-18" />
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
