const serverErrors = {
  error404: {
    message: "Recurso no encontrado",
    status: 404,
  },

  error500: {
    message: "Error interno del servidor",
    status: 500,
  },

  error503: {
    message: "Servicio no disponible",
    status: 503,
  },

  errorMaxVolunteers: {
    message: "Número máximo de voluntarios alcanzado",
    status: 409,
  },
  errorInvalidCredentials: {
    message: "Credenciales inválidas",
    status: 401,
  },

  errorUnauthorized: {
    message: "Acceso no autorizado",
    status: 401,
  },
  errorUserExists: {
    message: "El usuario ya existe",
    status: 409,
  },
  errorUserDontExists: {
    message: "El usuario no existe",
    status: 409,
  },

  errorJobCreation: {
    message: "Error al crear el trabajo",
    status: 500,
  },

  errorJobApplication: {
    message: "Error al postularse al trabajo",
    status: 500,
  },

  errorMissingData: {
    message: "Faltan datos de entrada",
    status: 400,
  },

  errorUnauthorizedRole: {
    message: "No tienes permisos para realizar esta acción",
    status: 403,
  },

  successJobCreation: {
    message: "Trabajo creado exitosamente",
    status: 201,
  },

  errorJobAlreadyExists: {
    message: "El trabajo ya existe",
    status: 409,
  },

  errorJobDontExists: {
    message: "El trabajo no existe",
    status: 409,
  },

  errorUserNotProvider: {
    message: "El usuario no es un proveedor",
    status: 403,
  },

  errorUserAlreadyPostulated: {
    message: "El usuario ya se ha postulado al trabajo",
    status: 409,
  },

  errorUserHasNotPostulated: {
    message: "El usuario no está postulado al trabajo",
    status: 409,
  },

  successUpdate: {
    message: "Información actualizada correctamente",
    status: 200,
  },

  succesDelete: {
    message: "Información eliminada correctamente",
    status: 204,
  },

  errorUpdate: {
    message: "No se pudo actualizar la información",
    status: 409,
  },

  successSignup: {
    message: "Registro exitoso",
    status: 200,
  },
  errorPostulationDontExist: {
    message: "La postulación no existe",
    status: 409,
  },
  errorProviderDontCreateJob:{
    message: "El trabajo no fue creado por este proveedor",
    status: 403,
  },
  errorPostulationAccepted: {
    message: "La postulación ya ha sido aceptada",
    status: 403,
  },
  errorDates: {
    message: "El intervalo de fechas no es válido",
    status: 403,
  },
  errorDateInitFuture: {
    message: "La fecha inicial no es valida. Es una fecha futura",
    status: 403,
  },
  errorDateEndFuture: {
    message: "La fecha final no es valida. Es una fecha futura",
    status: 403,
  }
};


module.exports = serverErrors;
