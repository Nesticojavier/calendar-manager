const reportsService = require("../services/reports.service");
const serverErrors = require("../error/error");
const fs = require("fs");
const path = require("path");
const pdfService = require("../services/file-generation/pdf.service");

const getReportProviderTracking = async (req, res) => {
  const outputPath = path.join(__dirname, "files", "output.pdf");
  const { id: users_id } = req.userData;
  const {providerId} = req.params
  const {startDate, endDate, date, format} = req.query

  console.log("IDDDDD: ", users_id)
  
  try {
    //get data
    const data = await reportsService.getReportProviderTracking(users_id);


    // res.json(data)
    // use pdf generation services
    await pdfService.providerTrackingReport(data, res, "username");
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getReportProviderTracking,
};
