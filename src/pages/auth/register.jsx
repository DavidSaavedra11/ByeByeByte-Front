import React, { useEffect } from "react";
import Input from "components/Input";
import { Enum_Rol } from "utils/enum";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import { REGISTRO } from "graphql/auth/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";
import { useUser } from "context/userContext";


const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();
  const { userData } = useUser();

  const [
    registro,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      console.log("dataMutation", dataMutation);
      console.log("dataMutation.registro.token: ", dataMutation.registro.token);
      if (dataMutation.registro.token && userData.estado ==="AUTORIZADO") {
        setToken(dataMutation.registro.token);
        navigate("/");  
      } else {
        navigate("/auth/validateRegister");
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className=" flex flex-col h-full w-full items-center justify-center">
      <div className=" rounded-lg border-2 p-4 bg-indigo-900 bg-opacity-75">
        <h1 className="text-3xl font-bold my-4 text-white">Regístrate</h1>
        <form
          className="flex flex-col"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <div className="grid grid-cols-2 gap-5 font-extrabold ">
            <Input label="Nombre:" name="nombre" type="text" required />
            <Input label="Apellido:" name="apellido" type="text" required />
            <Input
              label="Documento:"
              name="identificacion"
              type="text"
              required
            />
            <DropDown
              label="Rol deseado:"
              name="rol"
              required={true}
              options={Enum_Rol}
            />
            <Input label="Correo:" name="correo" type="email" required />
            <Input
              label="Contraseña:"
              name="password"
              type="password"
              required
            />
          </div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={false}
            text="Registrarme"
          />
        </form>
        <span className="text-white font-extrabold m-4">
          ¿Ya tienes una cuenta?
        </span>
        <Link to="/auth/login">
          <span className="text-white font-extrabold m-4">
            {" "}
            -- Inicia sesión
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
