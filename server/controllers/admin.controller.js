const { Credential } = require("../Models/Users");

const usersList = async (req, res) => {
  try {
    const users = await Credential.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

module.exports = {
  usersList,
};
