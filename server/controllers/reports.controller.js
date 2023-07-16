const reportsService = require("../services/reports.service");
const serverErrors = require("../error/error");
const fs = require("fs");
const path = require("path");
const pdfService = require("../services/file-generation/pdf.service");
const csvService = require("../services/file-generation/csv.service");
const { start } = require("repl");

const getReportProviderTracking = async (req, res) => {
  const outputPath = path.join(__dirname, "files", "output.pdf");
  const {username } = req.userData;
  const {providerId} = req.params
  const {startDate, endDate, format} = req.query

  try {
    if (!format || (format !== "pdf" && format !== "csv")) {
      throw serverErrors.errorMissingData
    }

    //get data
    const data = await reportsService.getReportProviderTracking(req.userData, providerId, startDate, endDate);

    // use pdf generation services
    if (format === "pdf") {
      await pdfService.providerTrackingReport(data, res, username); 
    }

    if (format === "csv") {
      await csvService.providerTrackingReport(data, res)
    }
  } catch (error) {
    console.log(error)
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const getReportProviderPostulations = async (req, res) => {
  const outputPath = path.join(__dirname, "files", "output.pdf");
  const {username } = req.userData;
  const {providerId} = req.params
  const {startDate, endDate, format} = req.query

  try {
    if (!format || (format !== "pdf" && format !== "csv")) {
      throw serverErrors.errorMissingData
    }

    //get data
    const data = await reportsService.getReportProviderPostulations(req.userData, providerId, startDate, endDate);

    // use pdf generation services
    if (format === "pdf") {
      await pdfService.providerPostulationsReport(data, res, username); 
    }

    if (format === "csv") {
      await csvService.providerPostulationsReport(data, res)
    }
  } catch (error) {
    console.log(error)
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const getReportVolunteerTracking = async (req, res) => {
  const outputPath = path.join(__dirname, "files", "output.pdf");
  const {username } = req.userData;
  const {startDate, endDate, format} = req.query

  try {
    if (!format || (format !== "pdf" && format !== "csv")) {
      throw serverErrors.errorMissingData
    }

    //get data
    const data = await reportsService.getReportVolunteerTracking(req.userData, startDate, endDate);

    // use pdf generation services
    if (format === "pdf") {
      return res.json(data)
      await pdfService.volunteerTrackingReport(data, res, username); 
    }

    if (format === "csv") {
      await csvService.volunteerTrackingReport(data, res)
    }
  } catch (error) {
    console.log(error)
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};
module.exports = {
  getReportProviderTracking,
  getReportProviderPostulations,
  getReportVolunteerTracking
};
