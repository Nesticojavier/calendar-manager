const { Credential, Users } = require("../Models/Users");

const usersList = async (req, res) => {

  try {

    const result = await Credential.findAll({   
      attributes: ["id", "username"],
      include: [
        {
          model: Users,
          attributes: ["rol"],
        },
      ],
    });

    // send response
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};


const updatepwd = (req, res) => {
  res.send("test update")
}


const login = (req, res) => {
  res.send("test login")
}

module.exports = {
  usersList,
  updatepwd,
  login
};
