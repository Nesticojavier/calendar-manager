const { Work } = require("../Models/Work");
const { Op } = require("sequelize");
const { insertTag } = require("./utils");
const { sq } = require("../db/db");

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
      .json({ message: "El usuario no posee permisos para crear el trabajo" });
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
    .then(([row, created]) => {
      if (created) {
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
const showJob = async (req, res) => {
  const { id: users_id } = req.userData.profile;
  const { id } = req.params;

  sq.query(
    `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
    FROM works wo 
    LEFT JOIN "workTags" w ON wo.id = w.works_id 
    LEFT JOIN tags t ON t.id = w.tags_id
    WHERE wo.id = :WORKID
    GROUP BY wo.id`,
    {
      replacements: { WORKID: id },
      type: sq.QueryTypes.SELECT,
    }
  ).then((results) => {
    res.json(results);
  });
};

// Controller to display jobs from a user
const showJobs = (req, res) => {
  const { id: users_id, rol } = req.userData.profile;
  if (rol !== "proveedor") {
    return res.status(403).json({ message: "El usuario no es proveedor" });
  }

  sq.query(
    `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
    FROM works wo 
    LEFT JOIN "workTags" w ON wo.id = w.works_id 
    LEFT JOIN tags t ON t.id = w.tags_id
    WHERE wo.users_id = :USERID
    GROUP BY wo.id`,
    {
      replacements: { USERID: users_id },
      type: sq.QueryTypes.SELECT,
    }
  )
    .then((results) => {
      res.json(results);
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
      id: {
        [Op.ne]: id,
      },
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

const showTags = (req, res) => {
  res.json({ tags: ["test1", "test2"] });
};

module.exports = {
  createJob,
  deleteJob,
  updateJob,
  showJobs,
  changeStatus,
  showJob,
  showTags,
};
