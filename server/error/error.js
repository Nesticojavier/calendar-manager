const errors = {
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

  errorInvalidCredentials: {
    message: "Credenciales inválidas",
    status: 401,
  },

  errorUnauthorized: {
    message: "Ruta protegida",
    status: 401,
  },
  errorUserExists: {
    message: "El usuario ya existe",
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
    message: "No tienes permisos para crear un trabajo",
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

  errorUserNotProvider: {
    message: "El usuario no es un proveedor",
    status: 403,
  },

  successUpdate: {
    message: "Información actualizada correctamente",
    status: 200,
  },

  successSignup: {
    message: "Registro exitoso",
    status: 200,
  },
};

module.exports = errors;
