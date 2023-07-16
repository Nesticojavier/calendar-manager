const reportsService = require("../services/reports.service");
const serverErrors = require("../error/error");
const fs = require("fs");
const path = require("path");
const pdfService = require("../services/file-generation/pdf.service");

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


    // res.json(data)
    // use pdf generation services
    if (format === "pdf") {
      await pdfService.providerTrackingReport(data, res, username); 
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
};
