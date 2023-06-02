const { Credential, Users } = require("../Models/Users"); //import database connection
const bcrypt = require("bcrypt"); //To encrypt passwords
const jwt = require("jsonwebtoken"); //Json Web Token Generator

// Must be placed in an environment variable
secretKey = "my_secret_key";

// Signup
// TODO: Check HTTP codes. Return the appropriate one in each case
const signup = async (req, res) => {
  const { username, password, rol, fullName, birthDate, institutionalId } =
    req.body;

  // Verify that the input data is not undefined
  if (!username || !password || !rol || !fullName || !birthDate) {
    return res.status(400).json({ message: "Error, missing sign up data" });
  }

  // Check if the user is already registered
  const consult = await Credential.findOne({
    where: {
      username,
    },
  });

  if (consult !== null) {
    return res.status(500).json({ message: "Error, registered user" });
  }

  // If the user does not exist, we encrypt his password and save it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error al cifrar la contraseña" });
    }

    try {
      Users.create({
        fullName,
        birthDate,
        institutionalId,
        rol,
      }).then((user) => {
        Credential.create({
          username,
          password: hash,
          users_id: user.id,
        });
      });

      res.status(201).json({ message: "Successful sign-up" });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  });
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  // Verify that the input data is not undefined
  if (!username || !password) {
    return res.status(500).json({ message: "Error, missing login data" });
  }

  // check if the user is already registered
  const consult = await Credential.findOne({
    where: {
      username,
    },
  });

  if (consult === null) {
    return res.status(500).json({ message: "Error, unregistered user" });
  }

  const password_hash = consult.password;
  const id = consult.users_id;

  // Validate password
  bcrypt.compare(password, password_hash, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al comparar las contraseñas" });
    }
    if (result) {
      Users.findOne({
        where: {
          id,
        },
      }).then((profile) => {
        // If the password is correct, we generate the JWT token and send it as a response to the client
        const token = jwt.sign({ username, profile }, secretKey);
        res.json({ token });
      });
    } else {
      // If the password is incorrect, we send an error message
      res.status(401).json({ message: "Password does not match the username" });
    }
  });
};

const dashboard = async (req, res) => {
  res.json(req.userData);
};

const showUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Middleware to verify and decode JWT token
const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "Acceso denegado" });
    // return res.status(401).send("Acceso denegado");
  }

  const token = header.split(" ")[1];

  try {
    req.userData = jwt.verify(token, secretKey);;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Error, token invalido" });
  }
};

module.exports = {
  signup,
  login,
  dashboard,
  showUsers,
  verifyToken,
};
