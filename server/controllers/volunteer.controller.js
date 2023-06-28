const { sq } = require("../db/db");
const serverErrors = require("../error/error");
const { updateUserTag } = require("../controllers/utils");
const { Blocks, UserBlocks } = require("../Models/Blocks");
const volunteerService = require("../services/volunteer.service");

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await volunteerService.getAllJobs();
    res.json(allJobs);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await volunteerService.getOneJob(id);
    res.json(job);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getJobByMonth = async (req, res) => {
  const { month, year } = req.params;

  try {
    const getJobsByMonth = await volunteerService.getJobByMonth(month, year);
    res.json(getJobsByMonth);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const editProfile = async (req, res) => {
  const { id: users_id } = req.userData;
  const { tags, blocks } = req.body;

  if (!tags || !blocks) {
    const error = serverErrors.errorMissingData;
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }

  try {
    await volunteerService.editProfile(users_id, tags, blocks);
    res.json(serverErrors.successUpdate)
  } catch (error) {
    return res
    .status(error?.status || 500)
    .json({ status: "FAILED", data: { error: error?.message || error } });

  }

};

const showProfile = async (req, res) => {
  const user = req.userData
  try {
    const profile = await volunteerService.showProfile(user)
    res.json(profile)
  } catch (error) {
    return res
    .status(error?.status || 500)
    .json({ status: "FAILED", data: { error: error?.message || error } });

  }

};

module.exports = {
  getAllJobs,
  getOneJob,
  getJobByMonth,
  editProfile,
  showProfile,
};
