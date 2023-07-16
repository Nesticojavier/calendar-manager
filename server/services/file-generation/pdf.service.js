const PDFDocument = require("pdfkit-table");

const generatePDFTable = async (data, res, user) => {
  // construct pdf
  const doc = new PDFDocument({ margin: 30, size: "A4" });

  // construct table
  const table = {
    title: `Trabajos de @${user}`,
    headers: ["titulo", "descripcion", "fecha de inicio", "fecha de fin"],
    rows: data.map((work) => [
      work.title,
      work.description,
      work.dateInit,
      work.dateEnd,
    ]),
  };

  doc.table(table);

  doc.pipe(res);

  doc.end();
};

/**
 * Generates a report in PDF format with a provider trace and sends the response
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
const providerTrackingReport = async (data, res, providerUsername) => {
  // construct pdf
  const doc = new PDFDocument({ margin: 30, size: "A4" });

  // construct table
  const table = {
    title: `Seguimiento del proveedor @${providerUsername}`,
    headers: [
      "Postulation_id",
      "Trabajo",
      "Tipo de trabajo",
      "Nombre de usuario",
      "Nombre completo",
      "Id institucional",
      "Fecha",
      "Hora",
      "Asistencia",
    ],
    rows: data,
  };

  doc.table(table);

  doc.pipe(res);

  doc.end();
};

/**
 * Generate a report in PDF format with the provider's applications and send
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
const providerPostulationsReport = async (data, res, providerUsername) => {
  // construct pdf
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  console.log(data)

  // construct table
  const table = {
    title: `Postulaciones del proveedor @${providerUsername}`,
    headers: [
      "Trabajo",
      "Tipo de trabajo",
      "Nombre de usuario",
      "Nombre completo",
      "Id institucional",
      "Fecha creación postulación",
      "Estado de la postulación",
    ],
    rows: data,
  };

  doc.table(table);

  doc.pipe(res);

  doc.end();
};

/**
 * Generates a report in PDF format with a volunteer trace and sends the response
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
const volunteerTrackingReport = async (data, res, volunteerUsername) => {
  // construct pdf
  const doc = new PDFDocument({ margin: 30, size: "A4" });

  // construct table
  const table = {
    title: `Seguimiento del voluntario @${volunteerUsername}`,
    headers: [
      "Trabajo",
      "Tipo de trabajo",
      "Nombre de usuario",
      "Nombre completo",
      "Fecha",
      "Hora",
      "Asistencia",
    ],
    rows: data.map((item) => [
      item.title,
      item.type,
      item.username,
      item.fullName,
      item.date,
      item.hour,
      item.attendance,
    ]),
  };

  doc.table(table);

  doc.pipe(res);

  doc.end();
};

module.exports = {
  generatePDFTable,
  providerPostulationsReport,
  providerTrackingReport,
  volunteerTrackingReport,
};
