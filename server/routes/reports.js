const express = require("express");
const router = express.Router();

const {
  getReportProviderTracking,
  getReportProviderPostulations,
  getReportVolunteerTracking
} = require("../controllers/reports.controller");

const { verifyToken } = require("../controllers/auth.controller");

router.get(
  "/provider-tracking/:providerId",
  verifyToken(process.env.USERS_ENCRYPT),
  getReportProviderTracking
);
router.get(
  "/provider-postulations/:providerId",
  verifyToken(process.env.USERS_ENCRYPT),
  getReportProviderPostulations
);

router.get(
  "/volunteer-tracking",
  verifyToken(process.env.USERS_ENCRYPT),
  getReportVolunteerTracking
);

router.get(
  "/admin-postulations/:providerId",
  verifyToken(process.env.ADMIN_ENCRYPT),
  getReportProviderPostulations
);

router.get(
  "/admin-tracking/:providerId",
  verifyToken(process.env.ADMIN_ENCRYPT),
  getReportProviderTracking
);

module.exports = router;
