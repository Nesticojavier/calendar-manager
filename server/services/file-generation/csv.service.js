const generateCSVFile = async (data, res, user) => {};

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
