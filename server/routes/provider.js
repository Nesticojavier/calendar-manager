const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/auth.controller");

const {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  showJob,
  changeStatus,
} = require("../controllers/provider.controller");

// Create a job (Information of user are in JWT)
router.post("/create", verifyToken, createJob);
// Show all jobs created by a user 
router.get("/myJobs", verifyToken, showJobs);

//Delete Job 
router.delete("/job/:id", verifyToken, deleteJob);

//Show details of a Job by id
router.get("/job/:id", verifyToken, showJob);

router.put("/job/:id", verifyToken, updateJob);
router.get("/changeStatus", verifyToken, changeStatus);

module.exports = router;
