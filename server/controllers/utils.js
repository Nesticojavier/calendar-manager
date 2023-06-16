const { Tags, WorkTags } = require("../Models/Tags");

// Function to insert works-tags
const insertTag = (works_id, tags) => {

  tags?.map((title) => {
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
          works_id,
        });
      })
      .catch(() => {
        console.log("Error en el servidor al crear tags");
      });
  });
};

const updateTag = (works_id, tags) => {
  WorkTags.destroy({
    where: {
      works_id: works_id
    }
  });
  insertTag(works_id, tags)
}

module.exports = {
  insertTag,
  updateTag,
};
