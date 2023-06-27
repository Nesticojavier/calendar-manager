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
  getJobByMonth
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

router.get("/jobs/:year/:month", getJobByMonth);


// router.get("/changeStatus", changeStatus);
module.exports = router;
