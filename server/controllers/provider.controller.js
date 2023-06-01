const { Work } = require("../Models/Work");
const { Users } = require("../Models/Users"); //import database connection

const createJob = (req, res) => {
  const { id, rol } = req.userData.profile;
  const {
    workDescription: description,
    workTitle: title,
    workType: type,
    workersNeeded: volunteerMax,
  } = req.body;

  console.log(title, description, type, volunteerMax);

  if (rol !== "proveedor") {
    return res
      .status(403)
      .json({ message: "The user dont have permiss to create works" });
  }

  console.log(req.body);
  console.log(req.userData);

  res.json(req.userData);
};

const deleteJob = (req, res) => {
  res.json({ message: "delete Job" });
};
const updateJob = (req, res) => {
  res.json({ message: "update Job" });
};
const showJobs = (req, res) => {
  res.json({ message: "show Jobs" });
};
const changeStatus = (req, res) => {
  res.json({ message: "change status of Job" });
};

module.exports = {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
};
