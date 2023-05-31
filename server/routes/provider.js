const express = require("express");
const router = express.Router();

const {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
} = require("../controllers/provider.controller");

//TO DO: Modify http method. Get is used temporarily to test routes
router.get("/create", createJob);
router.get("/delete", deleteJob);
router.get("/update", updateJob);
router.get("/myJobs", showJobs);
router.get("/changeStatus", changeStatus);

module.exports = router;
