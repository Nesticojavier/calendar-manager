const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/auth.controller");

const {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  showJob,
  showTags,
  getJobByMonth,
  jobsInProgress,
  acceptPostulation,
  declinePostulation,
  insertTrackingRecord,
  getTracking,
} = require("../controllers/provider.controller");

router.use(verifyToken(process.env.USERS_ENCRYPT));

// Create a job (Information of user are in JWT)
router.post("/create", createJob);
// Show all jobs created by a user
router.get("/myJobs", showJobs);
//Delete Job
router.delete("/job/:id", deleteJob);
//Show details of a Job by id
router.get("/job/:id", showJob);
// Update a job created by a user
router.put("/job/:id", updateJob);
//Show all the tags of a job
router.get("/job/tags/:id", showTags);
// Show all jobs by date
router.get("/jobs/:year/:month", getJobByMonth);
// Show applications from a user
router.get("/jobs-in-progress", jobsInProgress);
// Accept application
router.put("/postulation/:postulationID", acceptPostulation);
//Decline application
router.delete("/postulation/:postulationID", declinePostulation);
// insert register for tracking from a postulation
router.post("/tracking/:postulationID", insertTrackingRecord);
// get tracking from a postulation
router.get("/tracking/:postulationID", getTracking);

module.exports = router;
