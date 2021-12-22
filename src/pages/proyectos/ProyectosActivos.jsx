import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PROYECTOS, PROJECTACTIVE } from "graphql/proyectos/queries";
import DropDown from "components/Dropdown";
import Input from "components/Input";
import { Dialog } from "@mui/material";
import { Enum_EstadoProyecto } from "utils/enum";
import { Enum_FaseProyecto } from "utils/enum";
import ButtonLoading from "components/ButtonLoading";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import PrivateComponent from "components/PrivateComponent";
import { Link } from "react-router-dom";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";
import { ELIMINAR_OBJETIVO } from "graphql/proyectos/mutations";
import ReactLoading from "react-loading";
import { Enum_TipoObjetivo } from "utils/enum";
import { EDITAR_OBJETIVO } from "graphql/proyectos/mutations";

const ProyectosActivos = () => {
  const { data: queryData, loading } = useQuery(PROJECTACTIVE);

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.ProyectosActivos) {
    return (
      <div className="p-10 flex flex-col">
        <div className="p-1 flex w-full items-center justify-center">
          <h1 className="p-2 font-sans text-2xl font-bold text-gray-900">
            Proyectos
          </h1>
        </div>
        <div className="flex ">
          <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
            <div className="px-2 my-2 self-start">
              <button className="bg-green-400 border-black text-black-50 p-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-white font-bold">
                <Link to="/proyectos" className=" text-lg">
                  Todos los proyectos
                </Link>
              </button>
            </div>
          </PrivateComponent>
          <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
            <div className="my-2 self-start">
              <button className="bg-green-400 border-black text-black-50 p-2  rounded-lg shadow-2xl hover:bg-green-600 hover:text-white font-bold ">
                <Link to="/proyectos/activos" className=" text-lg">
                  Proyectos Activos
                </Link>
              </button>
            </div>
          </PrivateComponent>
          <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
            <div className="px-2 my-2 self-start">
              <button className="bg-green-400 border-black text-black-50 p-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-white font-bold">
                <Link to="/proyectos/nuevo" className=" text-lg">
                  Crear nuevo proyecto
                </Link>
              </button>
            </div>
          </PrivateComponent>
        </div>
        {queryData.ProyectosActivos.map((proyecto) => {
          return <AccordionProyecto proyecto={proyecto} />;
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogFase, setShowDialogFase] = useState(false);
  const [showDialogProject, setShowDialogProject] = useState(false);

  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={
            <i className="p-2 text-3xl text-green-300 fas fa-chevron-circle-down hover:text-yellow-500" />
          }
        >
          <div className="bg-red-600 p-2 rounded-xl  w-full justify-between">
            <div className=" font-bold text-yellow-100 flex flex-col">
              <h2 className="text-lg  text-black font-extrabold mx-2 justify-start uppercase font-sans">
                {" "}
                {proyecto.nombre}
              </h2>
              {/* <h3 className="px-2 flex justify-end">Estado:</h3> */}
              <h2 className="mx-2 flex justify-end"> {proyecto.estado}</h2>
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={["LIDER"]}>
            <div>
              <InscripcionProyecto
                idProyecto={proyecto._id}
                estado={proyecto.estado}
                inscripciones={proyecto.inscripciones}
              />

              <div className="flex py-2">
                <button
                  className="scale-1 mx-4 border-2 text-sm text-black bg-green-400 border-black text-black-50 px-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-green-200 font-bold "
                  onClick={() => {
                    setShowDialogProject(true);
                  }}
                >
                  Modificar Datos
                </button>
              </div>
            </div>
          </PrivateComponent>

          <div className="flex py-1">
            <h3 className="font-bold px-4">Lider proyecto: </h3>
            <div className=" font-bold text-green-700 font-style: italic">
              {" "}
              {`${proyecto.lider.nombre} ${proyecto.lider.apellido}`}{" "}
            </div>
          </div>

          <div className="flex py-1">
            <h3 className=" font-bold px-4">Correo: </h3>
            <div className="font-bold text-yellow-400 font-style: italic">
              {" "}
              {proyecto.lider.correo}
            </div>
          </div>

          <div className="flex py-1">
            <h3 className=" font-bold px-4">Presupuesto: </h3>
            <div className="font-bold text-red-800 font-style: italic">
              {"$ "}
              {proyecto.presupuesto}
            </div>
          </div>

          <div className="flex py-1">
            <h3 className="font-bold px-4">Estado: </h3>
            <div className="font-bold text-blue-300 font-style: italic">
              {" "}
              {proyecto.estado}
            </div>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
              <button
                className="scale-1 mx-4 border-2 text-sm text-black bg-green-400 border-black text-black-50 px-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-green-200 font-bold "
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                Modificar
              </button>
            </PrivateComponent>
          </div>

          <div className="flex py-1">
            <h3 className="font-bold px-4">Fase: </h3>
            <div className="font-bold text-blue-300 font-style: italic">
              {" "}
              {proyecto.fase}
            </div>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
              <button
                className="scale-1 mx-4 border-2 text-sm text-black bg-green-400 border-black text-black-50 px-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-green-200 font-bold "
                onClick={() => {
                  setShowDialogFase(true);
                }}
              >
                Modificar
              </button>
            </PrivateComponent>
          </div>

          <div className=" flex flex-col border-4 rounded-xl border-green-800 bg-green-900 ">
            <h1 className="p-2 flex justify-center font-extrabold text-xl text-white ">
              OBJETIVOS
            </h1>
            <div className="flex flex-row">
              {proyecto.objetivos.map((objetivo, index) => {
                return (
                  <Objetivo
                    index={index}
                    _id={objetivo._id}
                    idProyecto={proyecto._id}
                    tipo={objetivo.tipo}
                    descripcion={objetivo.descripcion}
                  />
                );
              })}
            </div>
          </div>

{/*           
          <div className=" inline-block border-4 rounded-xl border-green-800 bg-green-500 ">
            <h1 className="p-2 flex flex-row justify-center font-extrabold text-xl text-white ">
              Avances
            </h1>
            <div className="flex flex-col">
              {proyecto.objetivos.map((objetivo, index) => {
                return (
                  <Objetivo
                    index={index}
                    _id={objetivo._id}
                    idProyecto={proyecto._id}
                    tipo={objetivo.tipo}
                    descripcion={objetivo.descripcion}
                  />
                );
              })}
            </div>
          </div> */}
        </AccordionDetailsStyled>
      </AccordionStyled>

      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} fase={"editarEstado"} />
      </Dialog>

      <Dialog
        open={showDialogFase}
        onClose={() => {
          setShowDialogFase(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} fase={"editarFase"} />
      </Dialog>

      <Dialog
        open={showDialogProject}
        onClose={() => {
          setShowDialogProject(false);
        }}
      >
        <FormEditProyecto2
          _id={proyecto._id}
          fase={"editarProyecto"}
          proyecto={proyecto}
        />
      </Dialog>
    </>
  );
};

const FormEditProyecto2 = ({ _id, fase, proyecto }) => {
  const { form, formData, updateFormData } = useFormData();
  
  const DialogOn = () => {
    if (fase === "editarEstado") {
      let title = "Modificar Estado del Proyecto";
      return title;
    } else if (fase === "editarFase") {
      let title = "Modificar Fase del Proyecto";
      return title;
    } else if (fase === "editarProyecto") {
      let title = "Editar Datos del Proyecto";
      return title;
    }
  };

  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    editarProyecto(
      {
        variables: {
          _id,
          campos: formData,
        },
      },
      {
        refetchQueries: [{ query: PROJECTACTIVE }],
      }
    );
    window.location.reload(true);
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  return (
    <div className="p-4 bg-yellow-600">
      <h1 className="font-extrabold">{DialogOn()}</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <Input
          name="nombre"
          label="Nombre del Proyecto"
          defaultValue={proyecto.nombre}
          required={false}
          type="text"
        />
        <Input
          name="presupuesto"
          label="Presupuesto del Proyecto"
          defaultValue={proyecto.presupuesto}
          required={false}
          type="number"
        />

        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

const FormEditProyecto = ({ _id, fase }) => {
  const { form, formData, updateFormData } = useFormData();

  const DialogOn = () => {
    if (fase === "editarEstado") {
      let title = "Modificar Estado del Proyecto";
      return title;
    } else if (fase === "editarFase") {
      let title = "Modificar Fase del Proyecto";
      return title;
    } else if (fase === "editarProyecto") {
      let title = "Editar Datos del Proyecto";
      return title;
    }
  };

  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  return (
    <div className="p-4 bg-yellow-600">
      <h1 className="font-extrabold">{DialogOn()}</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        
        <DropDown
          label="Estado del Proyecto"
          name={fase === "editarEstado" ? "estado" : "fase"}
          options={
            fase === "editarEstado" ? Enum_EstadoProyecto : Enum_FaseProyecto
          }
        />

        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

const Objetivo = ({ index, _id, idProyecto, tipo, descripcion }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [
    eliminarObjetivo,
    { data: dataMutationEliminar, loading: eliminarLoading },
  ] = useMutation(ELIMINAR_OBJETIVO, {
    refetchQueries: [{ query: PROYECTOS }],
  });

  useEffect(() => {
    console.log("eliminar objetivo:", dataMutationEliminar);
    if (dataMutationEliminar) {
      toast.success("objetivo eliminado satisfactoriamente");
    }
  }, [dataMutationEliminar]);

  const ejecutarEliminacion = () => {
    eliminarObjetivo({ variables: { idProyecto, idObjetivo: _id } });
  };

  if (eliminarLoading)
    return (
      <ReactLoading
        data-testid="loading-in-button"
        type="spin"
        height={100}
        width={100}
      />
    );
  return (
    <div className="mx-5 my-4 bg-green-100 bg-opacity-70 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={["LIDER"]}>
        <div className="flex my-2">
          <button
            className="scale-1 mx-4 border-2 text-sm text-black bg-green-400 border-black text-black-50 px-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-white font-bold "
            onClick={() => {
              setShowEditDialog(true);
            }}
          >
            Editar
          </button>

          <button
            className=" scale-1 mx-4 border-2 text-sm text-black bg-red-400 border-black text-black-50 px-2 rounded-lg shadow-2xl hover:bg-red-600 hover:text-white font-bold "
            onClick={ejecutarEliminacion}
          >
            Eliminar
          </button>
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObjetivo
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idProyecto={idProyecto}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(
    EDITAR_OBJETIVO,
    {
      refetchQueries: [{ query: PROYECTOS }],
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success("Objetivo editado con exito");
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error("Error editando el objetivo");
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required={true}
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};


const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {

  return (
    <>
      <PrivateComponent roleList={["LIDER"]}>
        <Link
          to={`/avances/${idProyecto}`}
          className="scale-1 mx-4 border-2 text-sm text-black bg-green-400 border-black text-black-50 px-2 rounded-lg shadow-2xl hover:bg-green-600 hover:text-green-200 font-bold"
        >
          Visualizar Avances
        </Link>
      </PrivateComponent>
    </>
  );
};

export default ProyectosActivos;
