const { Tags } = require("../Models/Tags"); //
const utilsService = {
  showTags: async () => {
    try {
      const tags = await Tags.findAll({ attributes: ["id", "title"] });
      return tags;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = utilsService;
