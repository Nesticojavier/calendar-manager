const express = require("express");
const router = express.Router();

const { getReportProviderTracking } = require("../controllers/reports.controller");

const { verifyToken } = require("../controllers/auth.controller");

router.use(verifyToken(process.env.USERS_ENCRYPT));

router.get("/provider-tracking/:providerId", getReportProviderTracking);

module.exports = router;
