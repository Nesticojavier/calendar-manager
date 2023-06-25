const { Credential, Users } = require("../Models/Users"); //import database connection
const authService = require("../services/auth.service");
const serverErrors = require("../error/error");

// Signup
const signup = async (req, res) => {
  const user = ({
    username,
    password,
    rol,
    fullName,
    birthDate,
    institutionalId,
  } = req.body);

  // Verify that the input data is not undefined
  if (!username || !password || !rol || !fullName || !birthDate) {
    return res
      .status(500)
      .json({ message: serverErrors.errorMissingData.message });
  }

  try {
    await authService.signup(user);
    res.json(serverErrors.successSignup);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  // Verify that the input data is not undefined
  if (!username || !password) {
    return res
      .status(500)
      .json({ message: serverErrors.errorMissingData.message });
  }

  try {
    const sessionToken = await authService.login(username, password);
    res.json({ token: sessionToken });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
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
const verifyToken = (key) => {
  return async (req, res, next) => {
    const header = req.headers["authorization"];
    // Verify if exists token
    if (!header) {
      const error = serverErrors.error404;
      return res.status(error?.status || 500).json({
        status: "FAILED",
        data: { error: error?.message || error, name: error?.name },
      });
    }

    const token = header.split(" ")[1];

    try {
      req.userData = await authService.verifyToken(token, key);
      console.log(req.userData);
      next();
    } catch (error) {
      res.status(error?.status || 500).json({
        status: "FAILED",
        data: {
          error: error?.message || error,
          name: error?.name,
        },
      });
    }
  };
};

const verifyTokenADMIN = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "Acceso denegado" });
    // return res.status(401).send("Acceso denegado");
  }

  const token = header.split(" ")[1];

  try {
    req.userData = jwt.verify(token, process.env.ADMIN_ENCRYPT);
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
  verifyTokenADMIN,
};
