const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/auth.controller");

const {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
} = require("../controllers/provider.controller");

router.post("/create", verifyToken, createJob);

router.get("/delete", verifyToken, deleteJob);
router.get("/update", verifyToken, updateJob);
router.get("/myJobs", verifyToken, showJobs);
router.get("/changeStatus", verifyToken, changeStatus);

module.exports = router;
