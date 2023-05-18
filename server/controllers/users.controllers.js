const pool = require("../db/db"); //importar conexion a la base de datos
const bcrypt = require("bcrypt"); //Para encriptar las contrasenas

// Signup
// TODO: Chequear codigos HTTP. Retornar el adecuado en cada caso
const signup = async (req, res) => {
  const { username, password } = req.body;

  // Verificar que los datos de entrada no sean undefined
  if (!username || !password) {
    return res.status(500).json({ message: "Error en datos de entrada" });
  }

  // Verificar si el usuario ya se encuentra registrado
  const response = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (response.rowCount != 0) {
    return res.status(500).json({ message: "Error, usuario ya registrado" });
  }

  // Si el usuario no existe, ciframos su contraseña y la guardamos en la base de datos
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error al cifrar la contraseña" });
    }

    pool.query(
      "INSERT INTO users(username, password) VALUES($1, $2)",
      [username, hash],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error al registrar usuario" });
        }
      }
    );
    // Enviamos una respuesta al cliente indicando que el registro fue exitoso
    res.json({ message: "Registro exitoso" });
  });
};

// Login
const login = (req, res) => {
  res.send("login");
};

const dashboard = (req, res) => {
  res.send("dashboard");
};

const showUsers = (req, res) => {
  pool.query(" SELECT * FROM users", (error, result) => {
    if (error || result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Error al consultar la base de datos" }); // En caso de error, resolvemos la Promise con error
    }
    res.json(result.rows); // Si no, resolvemos con el resultado
  });
};

module.exports = {
  signup,
  login,
  dashboard,
  showUsers,
};
