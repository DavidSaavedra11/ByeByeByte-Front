const Enum_Rol = {
  ADMINISTRADOR: 'Administrador',
  ESTUDIANTE: 'Estudiante',
  LIDER: 'Líder',
};

const Enum_EstadoUsuario = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
  NO_AUTORIZADO: 'No autorizado',
};

const Enum_FaseProyecto = {
    INICIADO: 'Iniciado',
    EN_DESARROLLO: 'En Desarrollo',
    TERMINADO:'Terminado',
    NULO:'Nulo'
};

const Enum_EstadoProyecto = {
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
  CREADO: "Creado sin aprobar",
};


const Enum_TipoObjetivo = {
  GENERAL: "General",
  ESPECIFICO: "Específico",
};


export {
  Enum_Rol,
  Enum_EstadoUsuario,
  Enum_EstadoProyecto,
  Enum_TipoObjetivo,
  Enum_FaseProyecto,
};
