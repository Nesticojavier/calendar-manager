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
  const { id: users_id } = req.userData;
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
  )
    .then((results) => {
      res.json(results);
    })
    .catch(() => {
      res.status(500).json(error.error500);
    });
};

// Controller to display jobs from a user
const showJobs = (req, res) => {
  const { id: users_id, rol } = req.userData;
  if (rol !== "proveedor") {
    return res.status(403).json(error.errorUserNotProvider);
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
      results.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });
      res.json(results);
    })
    .catch((error) => {
      res.status(500).json(error.error500);
    });
};

const changeStatus = (req, res) => {
  res.json({ message: "change status of Job" });
};

// Controller to delete a job
const deleteJob = (req, res) => {
  const { id: users_id } = req.userData;
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
  const { id: users_id } = req.userData;
  const { id } = req.params;
  let {
    startDate: dateInit,
    endDate: dateEnd,
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
    return res.status(400).json(error.errorMissingData);
  }

  if (type == 2) {
    const dayOfWeek = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];
    const date = new Date(blocks[0].day);
    blocks[0].day = dayOfWeek[date.getDay()];
    blocks = [blocks[0]];
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
    return res.status(400).json(error.errorJobAlreadyExists);
  }

  Work.update(
    {
      title,
      description,
      type,
      volunteerCountMax,
      blocks: JSON.stringify(blocks),
      dateInit,
      dateEnd,
    },
    {
      where: {
        users_id,
        id,
      },
    }
  )
    .then((result) => {
      updateTag(id, tags);
      return res.json(error.successUpdate);
    })
    .catch(() => {
      return res.status(500).json(error.successUpdate);
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
