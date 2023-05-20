const pool = require("../db/db"); //importar conexion a la base de datos
const bcrypt = require("bcrypt"); //Para encriptar las contrasenas
const jwt = require("jsonwebtoken"); //Json Web Token Generator

// Debe colocarse en una variable de entorno
secretKey = "my_secret_key";

// Signup
// TODO: Chequear codigos HTTP. Retornar el adecuado en cada caso
const signup = async (req, res) => {
  const { username, password } = req.body;

  // Verificar que los datos de entrada no sean undefined
  if (!username || !password) {
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // Verificar si el usuario ya se encuentra registrado
  // const response = await pool.query("SELECT * FROM users WHERE username = $1", [
  //   username,
  // ]);
  // if (response.rowCount != 0) {
  //   return res.status(500).json({ message: "Error, usuario ya registrado" });
  // }
  const response = await pool
    .select()
    .from("users")
    .where("username", "=", username);

  if (response.length != 0) {
    return res.status(500).json({ message: "Error, usuario ya registrado" });
  }

  // Si el usuario no existe, ciframos su contraseña y la guardamos en la base de datos
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error al cifrar la contraseña" });
    }

    // pool.query(
    //   "INSERT INTO users(username, password) VALUES($1, $2)",
    //   [username, hash],
    //   (err, result) => {
    //     if (err) {
    //       return res
    //         .status(500)
    //         .json({ message: "Error al registrar usuario" });
    //     }
    //   }
    // );
    // Enviamos una respuesta al cliente indicando que el registro fue exitoso
    // res.json({ message: "Registro exitoso" });
    pool("users")
      .insert({ username, password })
      .then(() => {
        res.status(201).json({ mensaje: "Registro exitoso" });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error al registrar usuario" });
      });
  });
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  // Verificar que los datos de entrada no sean undefined
  if (!username || !password) {
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // Verificar si el usuario ya se encuentra registrado
  // const response = await pool.query("SELECT * FROM users WHERE username = $1", [
  //   username,
  // ]);
  // if (response.rowCount === 0) {
  //   return res.status(500).json({ message: "Error, usuario no registrado" });
  // }
  const response = await pool
    .select()
    .from("users")
    .where("username", "=", username);

  if (response.length != 0) {
    return res.status(500).json({ message: "Error, usuario no registrado" });
  }

  const password_hash = response.password;
  const id = response[0].id;

  bcrypt.compare(req.body.password, password_hash, (err, result) => {
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
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  });
};

// const login = (req, res) => {
//   res.send("login");
// };

const dashboard = (req, res) => {
  req.username;
  res.send("dashboard");
};

const showUsers = (req, res) => {
  // pool.query(" SELECT * FROM users", (error, result) => {
  //   if (error || result.rowCount === 0) {
  //     return res
  //       .status(404)
  //       .json({ message: "Error al consultar la base de datos" }); // En caso de error, resolvemos la Promise con error
  //   }
  //   res.json(result.rows); // Si no, resolvemos con el resultado
  // });
  pool
    .select()
    .from("users")
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener usuarios" });
    });
};

// Middleware para verificar y decodificar el token JWT
const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log("por aqui");

  if (!header) {
    return res.status(401).send("Acceso denegado");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (ex) {
    res.status(400).send("Token inválido");
  }
};

module.exports = {
  signup,
  login,
  dashboard,
  showUsers,
  verifyToken,
};
