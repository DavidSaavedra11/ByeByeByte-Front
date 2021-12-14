import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "context/userContext";

const ValidateRegister = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-8 m-4"'>
      <h1 className="text-6xl font-mono font-extrabold bg-gray-300">
        Usuario pendiente por autorizar <br /> Intente mas tarde...
      </h1>
      <button
        onClick={(e) => {
          navigate("/auth/login");
        }}
        className="col-span-2 bg-red-700 p-6 m-5 rounded-full shadow-md hover:bg-green-600 text-white font-bold text-xl"
      >
        {" "}
        Volver{" "}
      </button>
    </div>
  );
};

export default ValidateRegister;
