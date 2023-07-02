const utilsService = require("../services/utils.service")

const showTags = async (req, res) => {
  try {
    const tags = await utilsService.showTags();
    return res.json(tags);
  } catch (error) {
    return res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

module.exports = { showTags };
