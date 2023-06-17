const express = require("express");
const router = express.Router();

const {getAllJobs, getOneJob, getJobByMonth } = require("../controllers/volunteer.controller");
const {verifyToken} = require("../controllers/auth.controller")

router.use(verifyToken)

// Show all jobs
router.get("/jobs", getAllJobs);

// Show a job
router.get("/jobs/:id", getOneJob);

// Show jobs by mouth and year
router.get("/jobs/:year/:month", getJobByMonth);


// Edit tags from profile

// Preferences hours

// Filter

module.exports = router;
