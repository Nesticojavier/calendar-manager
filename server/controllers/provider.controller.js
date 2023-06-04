const { Work } = require("../Models/Work");
const { Tags, WorkTags } = require("../Models/Tags");

// Function to insert works-tags
const insertTag = (works_id, tags) => {
  tags.map((title) => {
    Tags.findOrCreate({
      where: {
        title,
      },
      defaults: {
        title,
      },
    })
      .then(([row, creado]) => {
        WorkTags.create({
          tags_id: row.dataValues.id,
          works_id
        })
        if (creado) {
          console.log("Tag creado con exito: " + title);
        } else {
          console.log("Tag ya existia: " + title);
          
        }
      })
      .catch(() => {
        console.log("Error en el servidor al crear tags")
      });
  });
};

// Controller to create a job
const createJob = (req, res) => {
  const { id: users_id, rol } = req.userData.profile;
  const {
    workDescription: description,
    workTitle: title,
    workType: type,
    workersNeeded: volunteerCountMax,
    blocks,
    tags,
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
      console.log(row.dataValues.id);
      if (creado) {
        insertTag(row.dataValues.id, tags);
        res.json({ message: "Trabajo creado exitosamente" });
      } else {
        res.status(409).json({ message: "Trabajo ya creado por el proveedor" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    });
};

// Controller to display a job from a user
const showJob = (req, res) => {
  const { id: users_id } = req.userData.profile;
  const { id } = req.params;

  Work.findOne({
    where: {
      users_id,
      id,
    },
  })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({
          message: "Error, trabajo no encontrado o no pertenece al usuario",
        });
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

const updateJob = async (req, res) => {
  const { id: users_id } = req.userData.profile;
  const { id } = req.params;
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

  // Find a job created by the user with same title
  const consult = await Work.findOne({
    where: {
      users_id,
      title,
    },
  });
  if (consult !== null) {
    return res
      .status(400)
      .json({ message: "Error, ya existe un trabajo con el titulo" });
  }

  Work.update(
    {
      title,
      description,
      type,
      volunteerCountMax,
      blocks: JSON.stringify(blocks),
    },
    {
      where: {
        users_id,
        id,
      },
    }
  )
    .then((result) => {
      return res.json({ message: "Se actualizo correctamente" });
    })
    .catch(() => {
      return res
        .status(500)
        .json({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports = {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
  showJob,
};
