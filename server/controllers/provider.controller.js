const createJob = (req, res) => {
  res.json({ message: "Create Job" });
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
