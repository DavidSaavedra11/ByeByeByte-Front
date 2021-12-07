import { gql } from "@apollo/client";

const REGISTRO = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $password: String!
    $rol: Enum_Rol!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      password: $password
      rol: $rol
    ) {
      token
      error
    }
  }
`;

export { REGISTRO };
