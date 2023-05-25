const pool = require("../db/db"); //importar conexion a la base de datos
const Users = require("../Models/Users"); //importar conexion a la base de datos
const bcrypt = require("bcrypt"); //Para encriptar las contrasenas
const jwt = require("jsonwebtoken"); //Json Web Token Generator

// Debe colocarse en una variable de entorno
secretKey = "my_secret_key";

// Signup
// TODO: Chequear codigos HTTP. Retornar el adecuado en cada caso
const signup = async (req, res) => {
  const { username, password, rol } = req.body;

  // Verificar que los datos de entrada no sean undefined
  if (!username || !password || !rol) {
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // Verificar si el usuario ya se encuentra registrado
  const users = await Users.findAll({
    where: {
      username,
    },
  });

  if (users.length != 0) {
    return res.status(500).json({ message: "Error, usuario ya registrado" });
  }

  // Si el usuario no existe, ciframos su contraseña y la guardamos en la base de datos
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
  // Verificar que los datos de entrada no sean undefined
  if (!username || !password) {
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // verificar si el usuarion ya está registrado
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

  // Validar password
  bcrypt.compare(password, password_hash, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al comparar las contraseñas" });
    }
    if (result) {
      // Si la contraseña es correcta, generamos el token JWT y lo enviamos como respuesta al cliente
      const token = jwt.sign({ id: id }, secretKey);
      res.json({ token });
    } else {
      // Si la contraseña es incorrecta, enviamos un mensaje de error
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

// Middleware para verificar y decodificar el token JWT
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
