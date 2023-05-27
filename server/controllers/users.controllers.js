const pool = require("../db/db"); //import database connection
const Users = require("../Models/Users"); //import database connection
const bcrypt = require("bcrypt"); //To encrypt passwords
const jwt = require("jsonwebtoken"); //Json Web Token Generator

// Must be placed in an environment variable
secretKey = "my_secret_key";

// Signup
// TODO: Check HTTP codes. Return the appropriate one in each case
const signup = async (req, res) => {
  const { username, password, rol } = req.body;

  // Verify that the input data is not undefined
  if (!username || !password || !rol) {
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // Check if the user is already registered
  const users = await Users.findAll({
    where: {
      username,
    },
  });

  if (users.length != 0) {
    return res.status(500).json({ message: "Error, usuario ya registrado" });
  }

  // If the user does not exist, we encrypt his password and save it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error al cifrar la contraseña" });
    }

    try {
      Users.create({
        username,
        password: hash,
        rol,
      });
      res.status(201).json({ message: "Registro exitoso" });
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
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // check if the user is already registered
  const response = await Users.findOne({
    where: {
      username,
    },
  });

  if (response === null) {
    return res.status(500).json({ message: "Error, unregistered user" });
  }

  const password_hash = response.password;
  const id = response.id;

  // Validate password
  bcrypt.compare(password, password_hash, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al comparar las contraseñas" });
    }
    if (result) {
      // If the password is correct, we generate the JWT token and send it as a response to the client
      const token = jwt.sign({ id: id }, secretKey);
      res.json({ token });
    } else {
      // If the password is incorrect, we send an error message
      res.status(401).json({ message: "Password does not match the username" });
    }
  });
};

const dashboard = async (req, res) => {
  // res.send("dashboard");

  const id = req.id.id;
  const response = await Users.findOne({
    where: {
      id,
    },
  });
  console.log(response.dataValues)
  res.json(response.dataValues);
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
    return res.status(401).send("Acceso denegado");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.id = decoded;
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
