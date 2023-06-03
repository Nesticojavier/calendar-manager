const { Work } = require("../Models/Work");
const { Users } = require("../Models/Users"); //import database connection

// Controller to create a job
const createJob = (req, res) => {
  const { id: users_id, rol } = req.userData.profile;
  const {
    workDescription: description,
    workTitle: title,
    workType: type,
    workersNeeded: volunteerCountMax,
    blocks,
  } = req.body;

  if (
    !title ||
    !description ||
    !type ||
    !volunteerCountMax ||
    blocks.length == 0
  ) {
    return res.status(400).json({ message: "Error, missing data" });
  }

  if (rol !== "proveedor") {
    return res
      .status(403)
      .json({ message: "The user dont have permiss to create works" });
  }

  Work.findOrCreate({
    where: {
      users_id,
      title,
    },
    defaults: {
      users_id,
      title,
      status: "propuesto",
      description,
      type,
      volunteerCountMax,
      blocks: JSON.stringify(blocks),
    },
  })
    .then(([fila, creado]) => {
      if (creado) {
        res.json({ message: "Trabajo creado exitosamente" });
      } else {
        res.status(409).json({ message: "Trabajo ya creado por el proveedor" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor " });
    });
};

// Controller to display jobs from a user
const showJobs = (req, res) => {
  const { id: users_id, rol } = req.userData.profile;
  if (rol !== "proveedor") {
    return res.status(403).json({ message: "The user is not provider" });
  }
  Work.findAll({
    where: {
      users_id,
    },
  })
    .then((myWorks) => {
      return res.json(myWorks);
    })
    .catch((error) => {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor " });
    });
};

const changeStatus = (req, res) => {
  res.json({ message: "change status of Job" });
};

const deleteJob = (req, res) => {
  res.json({ message: "delete Job" });
};

const updateJob = (req, res) => {
  res.json({ message: "update Job" });
};

module.exports = {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
};
