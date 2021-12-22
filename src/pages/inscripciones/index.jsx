import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import PrivateRoute from "components/PrivateRoute";
import { GET_INSCRIPCIONES } from "graphql/inscripciones/queries";
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import ButtonLoading from "components/ButtonLoading";
import { toast } from "react-toastify";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";

const IndexInscripciones = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);

  console.log("dataInscri", data);

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <div>Loading...</div>;
  return (
    <PrivateRoute roleList={["ADMINISTRADOR", "LIDER"]}>
      <div className="p-10">
        <h1 className="flex justify-center p-2 font-sans text-2xl font-bold text-gray-900">
          Inscripciones Estudiantes
        </h1>
        <div className="my-4">
          <AccordionInscripcion
            titulo="Inscripciones aprobadas"
            data={data.Inscripciones.filter((el) => el.estado === "ACEPTADO")}
          />
          <AccordionInscripcion
            titulo="Inscripciones pendientes"
            data={data.Inscripciones.filter((el) => el.estado === "PENDIENTE")}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo="Inscripciones rechazadas"
            data={data.Inscripciones.filter((el) => el.estado === "RECHAZADO")}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled
        expandIcon={
          <i className="p-2 text-3xl text-green-300 fas fa-chevron-circle-down hover:text-yellow-500" />
        }
      >
        <div className="bg-red-600 p-2 rounded-xl  w-full justify-between">
          <div className=" font-bold text-yellow-100 flex flex-col">
            <h2 className="text-lg  text-black font-extrabold mx-2 justify-start uppercase font-sans">
              {titulo}
            </h2>
            <h2 className="mx-2 flex justify-end"> Total ({data.length})</h2>
          </div>
        </div>
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className="flex justify-center">
          
          { data.length===0 ? (
            <h1 className='font-bold text-xl'>No hay Inscripciones!</h1>
          ) : (
            data.map((inscripcion) => {
              return (
                <Inscripcion inscripcion={inscripcion} refetch={refetch} />
              );
            })
          )}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);


  useEffect(() => {
    if (data) {
      toast.success("Inscripcion aprobada con exito");
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error aprobando la inscripcion");
    }
  }, [error]);

  const [
    rechazarInscripcion,
    { data: mutationData, loading: loadingData, error: errorData },
  ] = useMutation(RECHAZAR_INSCRIPCION);


  useEffect(() => {
    if (mutationData) {
      toast.success("Inscripcion rechazada con exito");
      refetch();
    }
  }, [mutationData]);

  useEffect(() => {
    if (errorData) {
      toast.error("Error rechazando la inscripcion");
    }
  }, [errorData]);




  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  };

  const modificarInscripcion = () => {
    rechazarInscripcion({
      variables: {
        rechazarInscripcionId: inscripcion._id,
      },
    });
  }

  return (
    <div className="bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl">
      <span className="font-bold text-green-700 font-style: italic">
        {inscripcion.proyecto.nombre}
      </span>
      <span className="font-bold text-yellow-700 font-style: italic">
        {inscripcion.estudiante.nombre}
      </span>
      <span className="font-bold text-white font-style: italic">
        {inscripcion.estado}
      </span>
      {inscripcion.estado === "PENDIENTE" && (
        <div className="flex flex-col">
          <ButtonLoading
            onClick={() => {
              cambiarEstadoInscripcion();
            }}
            text="Aprobar Inscripcion"
            loading={loading}
            disabled={false}
          />
          <ButtonLoading
            onClick={() => {
               modificarInscripcion();
            }}
            text="Rechazar Inscripcion"
            loading={loading}
            disabled={false}
          />
        </div>
      )}
    </div>
  );
};

export default IndexInscripciones;
