const { sq } = require("../db/db");
const { Work } = require("../Models/Work");
const { Tags, WorkTags } = require("../Models/Tags");

const { insertTag, updateTag } = require("../controllers/utils");
const serverErrors = require("../error/error");

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
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ];
      const date = new Date(work.blocks[0].day);
      work.blocks[0].day = dayOfWeek[date.getDay()];
    }

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
      console.log(work);
      return work;
    } catch (error) {
      // If any error occurs, roll back the transaction
      await t.rollback();
      throw error;
    }
  },
};

module.exports = providerService;
