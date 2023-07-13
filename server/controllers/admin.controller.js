const { Credential, Users } = require("../Models/Users");
const { Admin } = require("../Models/Admin");
const error = require("../error/error");
const jwt = require("jsonwebtoken"); //Json Web Token Generator
const bcrypt = require("bcrypt"); //To encrypt passwords

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  // Verify that the input data is not undefined
  if (!username || !password) {
    return res.status(500).json(error.errorMissingData);
  }

  // check if the user is already registered
  const consult = await Admin.findOne({
    where: {
      username,
    },
  });

  if (consult === null) {
    return res.status(500).json({ message: "Error, usuario no registrado" });
  }

  const password_hash = consult.password;
  const id = consult.id;

  // Validate password
  bcrypt.compare(password, password_hash, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Se produjo un error al validar los datos" });
    }
    if (result) {
      Admin.findOne({
        where: {
          id,
        },
      }).then((profile) => {
        // If the password is correct, we generate the JWT token and send it as a response to the client
        const token = jwt.sign(
          { username, rol: "admin" },
          process.env.ADMIN_ENCRYPT
        );
        res.json({ token });
      });
    } else {
      // If the password is incorrect, we send an error message
      res.status(401).json({ message: "Error en validacion de credenciales" });
    }
  });
};

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
    console.log(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const updatepwd = (req, res) => {
  const { username, password } = req.body;
  console.log(username)
  console.log(password)

  // Verify that the input data is not undefined
  if (!username || !password) {
    return res.status(500).json(error.errorMissingData);
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error almacenando los datos de autenticacion" });
    }

    Credential.update(
      {
        password: hash,
      },
      {
        where: {
          username
        },
      }
    ).then((results)=> {
      if (results[0] == 1) {

        return res.json(error.successUpdate)
      } else {
        return res.status(404).json(error.error404)
      }
    })
      .catch(() => {
        return res.status(500).json(error.error500);
      });
  });
};

module.exports = {
  usersList,
  updatepwd,
  login,
};
