import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PERFIL } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Enum_Rol, Enum_EstadoUsuario } from "utils/enum";
import { useUser } from "context/userContext";
import useFormData from "hooks/useFormData";

const IndexProfile = () => {
    const { userData } = useUser();
    console.log('userData', userData._id)

  const { data, error, loading } = useQuery(GET_PERFIL, {
    // pollInterval: 10,
  });
 


  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los Usuarios");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <div className="bg-red-200 h-full">
      <span className="flex flex-col items-center text-2xl m-2 font-extrabold">Perfil </span>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.UsuarioPerfil.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td>
                  <td>
                    <Link to={`/profile/editar/${u._id}`}>
                      <i className="fas fa-pen text-yellow-700 hover:text-red-400 cursor-pointer flex justify-center" />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default IndexProfile;
