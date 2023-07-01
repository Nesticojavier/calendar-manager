const { sq } = require("../db/db");
const { Op } = require("sequelize");
const { Work } = require("../Models/Work");
const { Tags, WorkTags } = require("../Models/Tags");
const { Users } = require("../Models/Users");
const { Credential } = require("../Models/Users");

const serverErrors = require("../error/error");
const { Postulation } = require("../Models/Postulation");

const providerService = {
  createJob: async (work, user) => {
    const { id: users_id, rol } = user;

    if (rol !== "proveedor") {
      throw serverErrors.errorUnauthorizedRole;
    }

    if (work.type == 2) {
      const dayOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ];
      const date = new Date(work.blocks[0].day);
      work.blocks[0].day = dayOfWeek[date.getDay()];
    }

    console.log(work);

    const existWork = await Work.findOne({
      where: {
        users_id,
        title: work.title,
      },
    });

    if (existWork) {
      throw serverErrors.errorJobAlreadyExists;
    }

    // Adding missing atributes to insert
    work.users_id = users_id;
    work.blocks = JSON.stringify(work.blocks);
    work.status = "propuesto";

    const t = await sq.transaction();

    try {
      const createdWork = await Work.create(work, { transaction: t });
      const promises = work.tags.map(async (title) => {
        const [tag, tagCreated] = await Tags.findOrCreate({
          where: {
            title,
          },
          defaults: {
            title,
          },
          transaction: t,
        });

        await WorkTags.create(
          {
            tags_id: tag.id,
            works_id: createdWork.id,
          },
          { transaction: t }
        );

        return tag;
      });

      await Promise.all(promises);

      // If everything is ok , then commit the transaction
      await t.commit();
      return work;
    } catch (error) {
      // If any error occurs, roll back the transaction
      await t.rollback();
      throw error;
    }
  },

  showJob: async (work_id) => {
    try {
      const job = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
        FROM works wo 
        LEFT JOIN "workTags" w ON wo.id = w.works_id 
        LEFT JOIN tags t ON t.id = w.tags_id
        WHERE wo.id = :WORKID
        GROUP BY wo.id`,
        {
          replacements: { WORKID: work_id },
          type: sq.QueryTypes.SELECT,
        }
      );
      if (job.length == 0) {
        throw serverErrors.error404;
      }

      job.tags = job.tags?.split(",");
      job.blocks = JSON.parse(job.blocks);

      return job;
    } catch (error) {
      throw error;
    }
  },
  showJobs: async (provider_id, start, limit) => {
    try {

      const countRows =  await Work.count({
        where: {
          users_id: provider_id
        }
      })
      const jobs = await sq.query(
        `SELECT wo.*, string_agg(t.title, ',') as Tags 
        FROM works wo 
        LEFT JOIN "workTags" w ON wo.id = w.works_id 
        LEFT JOIN tags t ON t.id = w.tags_id
        WHERE wo.users_id = :USERID
        GROUP BY wo.id
        LIMIT :LIMIT
        OFFSET :OFFSET`,
        {
          replacements: { USERID: provider_id, LIMIT: limit, OFFSET: start },
          type: sq.QueryTypes.SELECT,
        }
      );
      const promise = jobs.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      })
      await Promise.all(promise);

      const result = {count: countRows, rows : promise}
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteJob: async (user, work_id) => {
    const { id: users_id, rol } = user;

    if (rol !== "proveedor") {
      throw serverErrors.errorUnauthorizedRole;
    }

    try {
      const deletedWork = await Work.destroy({
        where: {
          users_id,
          id: work_id,
        },
      });

      if (deletedWork === 0) {
        throw serverErrors.error404;
      }
      return;
    } catch (error) {
      throw error;
    }
  },
  updateJob: async (work, user) => {
    const { id: users_id, rol } = user;

    if (rol !== "proveedor") {
      throw serverErrors.errorUnauthorizedRole;
    }

    // Find a job created by the user with same title
    const existWork = await Work.findOne({
      where: {
        users_id,
        title: work.title,
        id: {
          [Op.ne]: work.id,
        },
      },
    });

    if (existWork !== null) {
      throw serverErrors.errorJobAlreadyExists;
    }

    if (work.type == 2) {
      const dayOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ];
      const date = new Date(work.blocks[0].day);
      work.blocks[0].day = dayOfWeek[date.getDay()];
    }

    const t = await sq.transaction();
    try {
      // Update Work table
      const rowsUpdated = await Work.update(
        {
          title: work.title,
          description: work.description,
          type: work.type,
          volunteerCountMax: work.volunteerCountMax,
          blocks: JSON.stringify(work.blocks),
          dateInit: work.dateInit,
          dateEnd: work.dateEnd,
        },
        {
          where: {
            users_id,
            id: work.id,
          },
        }
      );

      if (rowsUpdated[0] === 0) {
        throw serverErrors.error404;
      }

      // Delete Olds tags
      await WorkTags.destroy({
        where: {
          works_id: work.id,
        },
        transaction: t,
      });

      // Insert New Tags
      const promises = work.tags.map(async (title) => {
        const [tag, tagCreated] = await Tags.findOrCreate({
          where: {
            title,
          },
          defaults: {
            title,
          },
          transaction: t,
        });

        await WorkTags.create(
          {
            tags_id: tag.id,
            works_id: work.id,
          },
          { transaction: t }
        );

        return tag;
      });

      await Promise.all(promises);
      await t.commit();

      return work;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
  getJobByMonth: async (month, year, users_id) => {
    const firstDay = new Date(year, month - 1, 1);
    const endDay = new Date(year, month, 0);
    try {
      const jobsByDate = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
                    FROM works wo 
                    LEFT JOIN "workTags" w ON wo.id = w.works_id 
                    LEFT JOIN tags t ON t.id = w.tags_id
                    GROUP BY wo.id
                    HAVING wo."dateInit" >= :FIRSTDAY::DATE AND 
                           wo."dateEnd" <= :ENDDAY::DATE AND
                           wo."users_id" = :USERID`,
        {
          replacements: {
            FIRSTDAY: firstDay,
            ENDDAY: endDay,
            USERID: users_id,
          },
          type: sq.QueryTypes.SELECT,
        }
      );

      const promise = jobsByDate.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });
      await Promise.all(promise);
      return promise;
    } catch (error) {
      throw error;
    }
  },
  jobsInProgress: async (users_id, start, limit, confirmed) => {
    try {
      const allJobs = await Postulation.findAndCountAll({
        where: {
          confirmed,
        },
        attributes: ["id", "confirmed"],
        include: [
          {
            model: Work,
            attributes: [
              "users_id",
              "title",
              "status",
              "description",
              "type",
              "volunteerCount",
              "volunteerCountMax",
              "blocks",
              "dateInit",
              "dateEnd",
            ],
            where: {
              users_id,
            },
          },
          {
            model: Users,
            attributes: ["rol", "fullName", "birthDate", "institucionalId"],
            include: [
              {
                model: Credential,
                attributes: ["username"],
              },
            ],
          },
        ],
        limit,
        offset: start,
      });
      return allJobs;
    } catch (error) {
      throw error;
    }
  },
  acceptPostulation: async (users_id, id) => {
    try {
      // Update Work table
      const rowsUpdated = await Postulation.update(
        {
          confirmed: true,
        },
        {
          where: {
            id,
          },
          include: [{ model: Work, where: users_id }],
        }
      );
      console.log(rowsUpdated);
      if (rowsUpdated[0] === 0) {
        throw serverErrors.error404;
      }

      return serverErrors.successUpdate;
    } catch (error) {
      throw error;
    }
  },
  declinePostulation: async (users_id, id) => {
    try {
      // Update Work table
      const rowsUpdated = await Postulation.destroy({
        where: {
          id,
          confirmed: false,
        },
        include: [{ model: Work, where: users_id }],
      });
      console.log(rowsUpdated);
      if (rowsUpdated === 0) {
        throw serverErrors.error404;
      }

      return serverErrors.succesDelete;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = providerService;
