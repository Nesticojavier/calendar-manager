const reportsService = require("../services/reports.service");
const serverErrors = require("../error/error");
const fs = require("fs");
const path = require("path");
const pdfService = require("../services/file-generation/pdf.service");

const getReportProvider = async (req, res) => {
  const outputPath = path.join(__dirname, "files", "output.pdf");
  const { id: users_id, username } = req.userData;

  try {
    //get data using database's service
    const data = await reportsService.getReportProvider(users_id);

    // use pdf generation services
    await pdfService.generatePDFTable(data, res, username);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getReportProvider,
};
