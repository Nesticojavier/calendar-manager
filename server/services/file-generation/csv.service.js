const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");


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
const providerTrackingReport = async (data, res, providerUsername) => {};

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
const providerPostulationsReport = async (data, res, providerUsername) => {};

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
const volunteerTrackingReport = async (data, res, volunteerUsername) => {};

module.exports = {
  generateCSVFile,
  providerPostulationsReport,
  providerTrackingReport,
  volunteerTrackingReport,
};
