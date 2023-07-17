const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");
const { format } = require('date-fns');


const generateCSVFile = async (data, res) => {
  // construct header
  const csvHeader = [
    { id: "id", title: "ID" },
    { id: "title", title: "Titulo" },
    { id: "description", title: "Descripción" },
    { id: "dateInit", title: "Fecha de inicio" },
    { id: "dateEnd", title: "Fecha de fin" },
  ];

  // construct path
  const csvFilePath = path.join(__dirname, "..", "..", "public", "data.csv");

  // construct file with header in the path
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: csvHeader,
  });

  // write data in the file
  await csvWriter.writeRecords(data);

  // construct buffer to send data to client
  const csvBuffer = fs.readFileSync(csvFilePath);

  // config and send data to client
  res.set("Content-Disposition", "attachment; filename=data.csv");
  res.set("Content-Type", "text/csv");
  res.send(csvBuffer);
};

/**
 * Generates a report in CSV format with a provider trace and sends the response
 * via the response object (res).
 *
 * @param {Array} data - provider tracking data
 *             Each element of the array must be an object with the following keys:
 *              - title
 *              - type
 *              - username
 *              - fullName
 *              - institutionalId
 *              - date
 *              - hour
 *              - attendance
 * @param {Object} res - The HTTP response object used to send the response.
 * @param {string} providerUsername - provider's username.
 * @returns {Promise<void>} - A promise that resolves when the report has
 *                            been generated and the response sent.
 */
const providerTrackingReport = async (data, res) => {
  // construct header
  const csvHeader = [
    { id: "postulation_id", title: "ID postulación" },
    { id: "title", title: "Trabajo" },
    { id: "type", title: "Tipo de trabajo" },
    { id: "username", title: "Nombre de usuario" },
    { id: "fullName", title: "Nombre Completo" },
    { id: "institutionalId", title: "ID institucional" },
    { id: "date", title: "Fecha" },
    { id: "hour", title: "Hora" },
    { id: "attendance", title: "Asistencia" },
  ];

  // construct path
  const csvFilePath = path.join(__dirname, "..", "..", "public", "data.csv");

  // construct file with header in the path
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: csvHeader,
  });

  // transform data
  const transformedData = data.map((item) => {
    return {
      postulation_id: item[0],
      title: item[1],
      type: item[2],
      username: item[3],
      fullName: item[4],
      institutionalId: item[5],
      date: item[6],
      hour: item[7],
      attendance: item[8],
    };
  });

  // write data in the file
  await csvWriter.writeRecords(transformedData);

  // construct buffer to send data to client
  const csvBuffer = fs.readFileSync(csvFilePath);

  // config and send data to client
  res.set("Content-Disposition", "attachment; filename=data.csv");
  res.set("Content-Type", "text/csv");
  res.send(csvBuffer);
};

/**
 * Generate a report in CSV format with the provider's applications and send
 * the response via the response object (res).
 *
 * @param {Array} data - provider postulations data
 *             Each element of the array must be an object with the following keys:
 *              - title
 *              - type
 *              - username
 *              - fullName
 *              - institutionalId
 *              - dateCreatedPostulation
 *              - statePostulation
 * @param {Object} res - The HTTP response object used to send the response.
 * @param {string} providerUsername - provider's username.
 * @returns {Promise<void>} - A promise that resolves when the report has
 *                            been generated and the response sent.
 */
const providerPostulationsReport = async (data, res) => {
  // construct header
  const csvHeader = [
    { id: "title", title: "Trabajo" },
    { id: "type", title: "Tipo de trabajo" },
    { id: "username", title: "Nombre de usuario" },
    { id: "fullName", title: "Nombre Completo" },
    { id: "institutionalId", title: "ID institucional" },
    { id: "dateCreatedPostulation", title: "Fecha creación postulación" },
    { id: "statePostulation", title: "Estado de la postulación" },
  ];

  // construct path
  const csvFilePath = path.join(__dirname, "..", "..", "public", "data.csv");

  // construct file with header in the path
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: csvHeader,
  });

  // transform data
  const transformedData = data.map((item) => {
    return {
      title: item[0],
      type: item[1],
      username: item[2],
      fullName: item[3],
      institutionalId: undefined,
      dateCreatedPostulation: format(item[5], 'yyyy-MM-dd'),
      statePostulation: item[6],
    };
  });

  // write data in the file
  await csvWriter.writeRecords(transformedData);

  // construct buffer to send data to client
  const csvBuffer = fs.readFileSync(csvFilePath);

  // config and send data to client
  res.set("Content-Disposition", "attachment; filename=data.csv");
  res.set("Content-Type", "text/csv");
  res.send(csvBuffer);
};

/**
 * Generates a report in CSV format with a volunteer trace and sends the response
 * via the response object (res).
 *
 * @param {Array} data - provider postulations data
 *             Each element of the array must be an object with the following keys:
 *              - title
 *              - type
 *              - username
 *              - fullName
 *              - date
 *              - hour
 *              - attendance
 * @param {Object} res - The HTTP response object used to send the response.
 * @param {string} volunteerUsername - volunteer's username.
 * @returns {Promise<void>} - A promise that resolves when the report has
 *                            been generated and the response sent.
 */
const volunteerTrackingReport = async (data, res) => {
  // construct header
  const csvHeader = [
    { id: "postulation_id", title: "ID postulacion" },
    { id: "title", title: "Trabajo" },
    { id: "type", title: "Tipo de trabajo" },
    { id: "username", title: "Nombre de usuario" },
    { id: "fullName", title: "Nombre Completo" },
    { id: "date", title: "Fecha" },
    { id: "hour", title: "Hora" },
    { id: "attendance", title: "Asistencia" },
  ];

  // construct path
  const csvFilePath = path.join(__dirname, "..", "..", "public", "data.csv");

  // construct file with header in the path
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: csvHeader,
  });

  // transform data
  const transformedData = data.map((item) => {
    return {
      postulation_id: item[0],
      title: item[1],
      type: item[2],
      username: item[3],
      fullName: item[4],
      date: item[6],
      hour: item[7],
      attendance: item[8]
    };
  });

  // write data in the file
  await csvWriter.writeRecords(transformedData);

  // construct buffer to send data to client
  const csvBuffer = fs.readFileSync(csvFilePath);

  // config and send data to client
  res.set("Content-Disposition", "attachment; filename=data.csv");
  res.set("Content-Type", "text/csv");
  res.send(csvBuffer);
};

module.exports = {
  generateCSVFile,
  providerPostulationsReport,
  providerTrackingReport,
  volunteerTrackingReport,
};
