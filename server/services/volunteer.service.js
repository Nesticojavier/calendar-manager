const serverErrors = require("../error/error");
const { sq } = require("../db/db");
const { UserTags, Tags } = require("../Models/Tags");
const { UserBlocks } = require("../Models/Blocks");
const { Postulation } = require("../Models/Postulation");
const { Work } = require("../Models/Work");

const volunteerService = {
  getAllJobs: async () => {
    try {
      const allJobs = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
        FROM works wo 
        LEFT JOIN "workTags" w ON wo.id = w.works_id 
        LEFT JOIN tags t ON t.id = w.tags_id
        GROUP BY wo.id`,
        {
          type: sq.QueryTypes.SELECT,
        }
      );

      promises = allJobs.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });

      await Promise.all(promises);
      return promises;
    } catch (error) {
      throw error;
    }
  },
  getAllJobsPaginated: async (start, limit) => {
    try {
      const countRows = await Work.count();
      const allJobs = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
        FROM works wo 
        LEFT JOIN "workTags" w ON wo.id = w.works_id 
        LEFT JOIN tags t ON t.id = w.tags_id
        GROUP BY wo.id
        LIMIT :LIMIT
        OFFSET :OFFSET`,
        {
          replacements: { LIMIT: limit, OFFSET: start },
          type: sq.QueryTypes.SELECT,
        }
      );

      const promise = allJobs.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });

      const result = { count: countRows, rows: promise };
      return result;
    } catch (error) {
      throw error;
    }
  },
  getOneJob: async (id) => {
    try {
      const job = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
                FROM works wo 
                LEFT JOIN "workTags" w ON wo.id = w.works_id 
                LEFT JOIN tags t ON t.id = w.tags_id
                WHERE wo.id = :ID
                GROUP BY wo.id`,
        {
          replacements: { ID: id },
          type: sq.QueryTypes.SELECT,
        }
      );
      const promise = job.map((e) => {
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
  getJobByMonth: async (month, year) => {
    const firstDay = new Date(year, month - 1, 1);
    const endDay = new Date(year, month, 0);
    try {
      const jobsByDate = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
                    FROM works wo 
                    LEFT JOIN "workTags" w ON wo.id = w.works_id 
                    LEFT JOIN tags t ON t.id = w.tags_id
                    GROUP BY wo.id
                    HAVING wo."dateInit" <= :ENDDAY::DATE AND 
                           wo."dateEnd" >= :FIRSTDAY::DATE`,
        {
          replacements: {
            FIRSTDAY: firstDay,
            ENDDAY: endDay,
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
  editProfile: async (users_id, tags, blocks) => {
    const t = await sq.transaction();
    try {
      await UserBlocks.destroy({
        where: {
          users_id,
        },
        transaction: t,
      });

      const blockPromise = blocks.map(
        (block) => {
          UserBlocks.create({
            users_id,
            hour: block.hour,
          });
        },
        { transaction: t }
      );

      await UserTags.destroy({
        where: {
          users_id,
        },
        transaction: t,
      });

      // Insert New Tags
      const tagPromise = tags.map(async (title) => {
        const [tag, tagCreated] = await Tags.findOrCreate({
          where: {
            title,
          },
          defaults: {
            title,
          },
          transaction: t,
        });

        await UserTags.create(
          {
            tags_id: tag.id,
            users_id,
          },
          { transaction: t }
        );

        return tag;
      });

      await Promise.all(tagPromise);
      await Promise.all(blockPromise);
      await t.commit();
      return;
    } catch (error) {
      throw error;
    }
  },
  showProfile: async (user) => {
    const { id } = user;
    const response = { id, tags: [], blocks: [] };
    await sq
      .query(
        `SELECT t.title
         FROM tags t, "userTags" u
         WHERE t.id = u.tags_id AND u.users_id = :id `,
        {
          replacements: { id },
          type: sq.QueryTypes.SELECT,
        }
      )
      .then((results) => {
        response.tags = results.map((e) => e.title);
      })
      .catch(() => {
        throw serverErrors.error500;
      });

    await sq
      .query(
        `SELECT b.hour
         FROM userblocks b
         WHERE b.users_id = :id `,
        {
          replacements: { id },
          type: sq.QueryTypes.SELECT,
        }
      )
      .then((results) => {
        response.blocks = results.map((e) => e.hour);
      })
      .catch(() => {
        throw serverErrors.error500;
      });

    return response;
  },
  postulate: async (user, works_id, dateInit, dateEnd) => {
    const { id: users_id, rol } = user;
    
    if (rol !== "voluntario") {
      throw serverErrors.errorUnauthorizedRole;
    }

 
    try {
      const work = await Work.findByPk(works_id);

      if (work === null) {
        throw serverErrors.errorJobDontExists;
      }

      if (work.volunteerCount + 1 > work.volunteerCountMax) {
        throw serverErrors.errorMaxVolunteers;
      }

      if (work.dateInit > dateInit || work.dateEnd < dateEnd || dateInit > dateEnd) {
        throw serverErrors.errorDates
      }

      const postulation = await Postulation.create({ users_id, works_id });

      return postulation;
    } catch (error) {
      if (error.name == "SequelizeUniqueConstraintError") {
        throw serverErrors.errorUserAlreadyPostulated;
      }

      throw error;
    }
  },
  jobsInProgress: async (user, start, limit, confirmed) => {
    const { id: users_id, rol } = user;

    if (rol !== "voluntario") {
      throw serverErrors.errorUnauthorizedRole;
    }
    try {
      const allJobs = await Postulation.findAndCountAll({
        where: {
          users_id,
          confirmed,
        },
        include: [
          {
            model: Work,
            attributes: [
              "id",
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
          },
        ],
        limit,
        offset: start,
        attributes: ["users_id", "confirmed"],
      });
      return allJobs;
    } catch (error) {
      throw error;
    }
  },
  cancelPostulation: async (user, works_id) => {
    const { id: users_id, rol } = user;

    if (rol !== "voluntario") {
      throw serverErrors.errorUnauthorizedRole;
    }

    try {
      const work = await Work.findByPk(works_id);

      if (work === null) {
        throw serverErrors.errorJobDontExists;
      }

      const rowsDeleted = await Postulation.destroy({
        where: { users_id, works_id },
      });

      if (rowsDeleted === 0) {
        throw serverErrors.errorUserHasNotPostulated;
      }
      return;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = volunteerService;
