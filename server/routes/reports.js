const express = require("express");
const router = express.Router();

const { getReportProvider } = require("../controllers/reports.controller");

const { verifyToken } = require("../controllers/auth.controller");

router.use(verifyToken(process.env.USERS_ENCRYPT));

router.get("/provider", getReportProvider);

module.exports = router;
