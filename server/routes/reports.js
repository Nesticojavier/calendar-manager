const express = require("express");
const router = express.Router();

const { getReportProviderTracking } = require("../controllers/reports.controller");

const { verifyToken } = require("../controllers/auth.controller");


router.get("/provider-tracking/:providerId", verifyToken(process.env.USERS_ENCRYPT),getReportProviderTracking);
router.get("/admin-tracking/:providerId", verifyToken(process.env.ADMIN_ENCRYPT),getReportProviderTracking);


module.exports = router;
