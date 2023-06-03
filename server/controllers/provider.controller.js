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
    return res.status(400).json({ message: "Error, faltan datos del trabajo" });
  }

  if (rol !== "proveedor") {
    return res
      .status(403)
      .json({ message: "El usuario no posee permisos para crear trabaos" });
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
    .then(([row, creado]) => {
      if (creado) {
        res.json({ message: "Trabajo creado exitosamente" });
      } else {
        res.status(409).json({ message: "Trabajo ya creado por el proveedor" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    });
};

// Controller to display jobs from a user
const showJobs = (req, res) => {
  const { id: users_id, rol } = req.userData.profile;
  if (rol !== "proveedor") {
    return res.status(403).json({ message: "El usuario no es proveedor" });
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

// Controller to delete a job
const deleteJob = (req, res) => {
  const { id: users_id } = req.userData.profile;
  const { id } = req.params;

  Work.destroy({
    where: {
      users_id,
      id,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted !== 0) {
        res.json({ message: "Registro eliminado con exito" });
      } else {
        res
          .status(404)
          .json({ message: "El trabajo a eliminar no se encontro" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    });
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