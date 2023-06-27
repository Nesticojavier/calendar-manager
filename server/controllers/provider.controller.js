const { Work } = require("../Models/Work");
const { Op } = require("sequelize");
const { sq } = require("../db/db");
const error = require("../error/error");
const providerService = require("../services/provider.service");

// Controller to create a job
const createJob = async (req, res) => {
  const user = req.userData;
  const {
    workDescription: description,
    workTitle: title,
    workType: type,
    workersNeeded: volunteerCountMax,
    blocks,
    workTags: tags,
    startDate: dateInit,
    endDate: dateEnd,
  } = req.body;

  if (
    !title ||
    !description ||
    !type ||
    !volunteerCountMax ||
    !blocks ||
    !dateInit ||
    !dateEnd ||
    !tags ||
    tags.length == 0 ||
    blocks.length == 0
  ) {
    return res.status(400).json({ message: error.errorMissingData.message });
  }

  const work = {
    description,
    title,
    type,
    volunteerCountMax,
    blocks,
    tags,
    dateInit,
    dateEnd,
  };

  try {
    const createdJob = await providerService.createJob(work, user);
    res.json(createdJob);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// Controller to display a job from a user
const showJob = async (req, res) => {
  const { id } = req.params;

  try {
    const getJob = await providerService.showJob(id);
    res.json(getJob);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// Controller to display jobs from a user
const showJobs = async (req, res) => {
  const { id: users_id } = req.userData;

  try {
    const allJobsByProv = await providerService.showJobs(users_id);
    res.json(allJobsByProv);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const changeStatus = (req, res) => {
  res.json({ message: "change status of Job" });
};

// Controller to delete a job
const deleteJob = async (req, res) => {
  const user = req.userData;
  const { id: work_id } = req.params;

  console.log(user);
  try {
    await providerService.deleteJob(user, work_id);
    res.sendStatus(204);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateJob = async (req, res) => {
  const user = req.userData;
  const { id } = req.params;
  let {
    workDescription: description,
    workTitle: title,
    workType: type,
    workersNeeded: volunteerCountMax,
    blocks,
    workTags: tags,
    startDate: dateInit,
    endDate: dateEnd,
  } = req.body;

  if (
    !title ||
    !description ||
    !type ||
    !volunteerCountMax ||
    !blocks ||
    !dateInit ||
    !dateEnd ||
    !tags ||
    tags.length == 0 ||
    blocks.length == 0
  ) {
    return res.status(400).json({ message: error.errorMissingData.message });
  }

  const work = {
    description,
    title,
    type,
    volunteerCountMax,
    blocks,
    tags,
    dateInit,
    dateEnd,
    id,
  };

  try {
    const updatedJob = await providerService.updateJob(work, user);
    res.json(updatedJob);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const showTags = (req, res) => {
  res.json({ tags: ["test1", "test2"] });
};

const getJobByMonth = async (req, res) => {
  const { month, year } = req.params;
  const { id } = req.userData;

  try {
    const getJobsByMonth = await providerService.getJobByMonth(month, year, id);
    res.json(getJobsByMonth);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
  showJob,
  showTags,
  getJobByMonth,
};
