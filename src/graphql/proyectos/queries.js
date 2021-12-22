import { gql } from "@apollo/client";

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      presupuesto
      objetivos {
        _id
        descripcion
        tipo
      }
      lider {
        _id
        correo
        nombre
        apellido
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const PROJECTACTIVE = gql`
  query ProyectosActivos {
    ProyectosActivos {
      _id
      nombre
      estado
      fase
      presupuesto
      inscripciones {
        _id
        fechaEgreso
      }
      lider {
        nombre
        apellido
        correo
      }
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;

export { PROYECTOS, PROJECTACTIVE };
