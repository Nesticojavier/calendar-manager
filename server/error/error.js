// serverErrors.js

const error404 = {
  message: "Recurso no encontrado",
};

const error500 = {
  message: "Error interno del servidor",
};

const error503 = {
  message: "Servicio no disponible",
};

const errorInvalidCredentials = {
  message: "Credenciales inválidas",
};

const errorUserExists = {
  message: "El usuario ya existe",
};

const errorJobCreation = {
  message: "Error al crear el trabajo",
};

const errorJobApplication = {
  message: "Error al postularse al trabajo",
};

const errorMissingData = {
  message: "Faltan datos de entrada",
};

const errorUnauthorized = {
  message: "No tienes permisos para crear un trabajo",
};

const successJobCreation = {
  message: "Trabajo creado exitosamente",
};

const errorJobAlreadyExists = {
  message: "El trabajo ya existe",
};

const errorUserNotProvider = {
  message: "El usuario no es un proveedor",
};

const successUpdate = {
  message: "Información actualizada correctamente",
};
// Exportar las variables de error
module.exports = {
  error404,
  error500,
  error503,
  errorInvalidCredentials,
  errorUserExists,
  errorJobCreation,
  errorJobApplication,
  errorMissingData,
  errorUnauthorized,
  successJobCreation,
  errorJobAlreadyExists,
  errorUserNotProvider,
  successUpdate,
};
