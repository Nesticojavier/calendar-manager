const reportsService = require("../services/reports.service");
const serverErrors = require("../error/error");
const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");

const getReportProviderTracking = async (req, res) => {
  const outputPath = path.join(__dirname, "files", "output.pdf");
  const { id: users_id } = req.userData;
  const {providerId} = req.params
  const {startDate, endDate, date, format} = req.query
  
  try {
    //get data
    const data = await reportsService.getReportProviderTracking(users_id);

    // construct pdf
    const doc = new PDFDocument({ margin: 30, size: "A4" });

    // set path to save pdf
    // doc.pipe(fs.createWriteStream(outputPath));
    
    // function to generate pdf
    await generatePDFTable(doc, data);
    doc.pipe(res)
    
    doc.end();
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }

  // return res.json({ message: "exitoso" });
};

const generatePDFTable = async (doc, data) => {
  const table = {
    title: "Mis trabajos",
    headers: ["titulo", "descripcion", "fecha de inicio", "fecha de fin"],
    rows: data.map((work) => [work.title, work.description, work.dateInit, work.dateEnd]),
  };

  const startX = 50;
  const startY = 50;
  const tableOptions = {
    x: startX,
    y: startY,
    width: 500,
  };

  doc.table(table, tableOptions);
};

module.exports = {
  getReportProviderTracking,
};
