import React, { useEffect } from "react";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [
    login,
    { data: dataMutation, loading: mutationLoading },
  ] = useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate("/");
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div className=" rounded-lg border-2 p-4 bg-indigo-900 bg-opacity-75">
        <h1 className="text-xl font-extrabold text-white ">Iniciar sesión</h1>
        <form
          className="flex flex-col"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <div className="font-extrabold text-lg  ">
            <Input name="correo" type="email" label="Correo" required={true} />
            <Input
              name="password"
              type="password"
              label="Contraseña"
              required={true}
            />
          </div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text="Iniciar Sesión"
          />
        </form>
        <span className="text-white font-extrabold m-4 ">
          ¿No tienes una cuenta?
        </span>
        <Link to="/auth/register">
          <span className="text-white font-bold m-4">Regístrate</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
