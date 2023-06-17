const express = require("express");
const router = express.Router();

const {getAllJobs, getOneJob, getJobByMonth } = require("../controllers/volunteer.controller");

// Show all jobs
router.get("/jobs", getAllJobs);

// Show a job
router.get("/jobs/:id", getOneJob);

// Show jobs by mouth
router.get("/jobs/mouth/:month", getJobByMonth );

// Filter

module.exports = router;
