import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Input from "components/Input";
import { Link } from "react-router-dom";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Enum_TipoObjetivo } from "utils/enum";
import { nanoid } from "nanoid";
import { ObjContext } from "context/objContext";
import { useObj } from "context/objContext";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import { GET_USUARIOS, GET_PERFIL } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useUser } from "context/userContext";
import PrivateComponent from "components/PrivateComponent";

const NuevoProyecto = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { userData } = useUser();

  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PERFIL);

  console.log("queryData1", queryData);

  const [
    crearProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_PROYECTO);

  useEffect(() => {
    console.log(data);
    console.log("Data", data);
    console.log("queryData2", queryData);

    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[
          elemento._id
        ] = `${elemento.nombre} ${elemento.apellido} ${elemento.estado} ${elemento.rol}`;
      });

      setListaUsuarios(lu);
    }
  }, [data]);

  useEffect(() => {
    console.log("data mutation", mutationData);
  });

  const submitForm = (e) => {
    e.preventDefault();
    if (!formData.objetivos) {
      formData.presupuesto = parseFloat(formData.presupuesto);
      crearProyecto({
        variables: formData,
      });
      console.log("formDataValidar", formData);
    } else {
      formData.objetivos = Object.values(formData.objetivos);
      formData.presupuesto = parseFloat(formData.presupuesto);
      crearProyecto({
        variables: formData,
      });
    }
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto creado con exito!");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error creando el Proyecto!");
    }
  }, [mutationError]);

  if (loading) return <div>...Loading</div>;

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input
          name="nombre"
          label="Nombre del Proyecto"
          required={true}
          type="text"
        />
        <Input
          name="presupuesto"
          label="Presupuesto del Proyecto"
          required={true}
          type="number"
        />
        <Input
          name="fechaInicio"
          label="Fecha de Inicio"
          required={true}
          type="date"
        />
        <Input
          name="fechaFin"
          label="Fecha de Fin"
          required={true}
          type="date"
        />
        <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <DropDown
            label="L??der"
            options={listaUsuarios}
            name="lider"
            required={true}
          />
        </PrivateComponent>
        <Objetivos />
        <ButtonLoading text="Crear Proyecto" loading={false} disabled={false} />
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Proyecto</span>
        {!maxObjetivos && (
          <i
            onClick={() =>
              setListaObjetivos([
                ...listaObjetivos,
                componenteObjetivoAgregado(),
              ])
            }
            className="fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer"
          />
        )}
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className="flex items-center">
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label="Descripci??n"
        type="text"
        required={true}
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label="Tipo de Objetivo"
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className="fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6"
      />
    </div>
  );
};

export default NuevoProyecto;
