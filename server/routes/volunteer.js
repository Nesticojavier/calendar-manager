const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getOneJob,
  getJobByMonth,
  editProfile,
  showProfile,
  postulate,
  jobsInProgress,
} = require("../controllers/volunteer.controller");
const { verifyToken } = require("../controllers/auth.controller");

router.use(verifyToken(process.env.USERS_ENCRYPT));

// Show all jobs
router.get("/jobs", getAllJobs);

// Show a job
router.get("/jobs/:id", getOneJob);

// Show jobs by mouth and year
router.get("/jobs/:year/:month", getJobByMonth);

// Edit volunteer profile
router.put("/profile", editProfile);

// View volunteer profile
router.get("/profile", showProfile);

// apply for a job
router.post("/postulation", postulate);

// Show applications from a user
router.get("/jobs-in-progress", jobsInProgress);

module.exports = router;
