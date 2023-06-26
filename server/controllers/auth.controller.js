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

// Show profile info
const dashboard = async (req, res) => {
  res.json(req.userData);
};

// Middleware to verify and decode JWT token
const verifyToken = (key) => {
  return async (req, res, next) => {
    const header = req.headers["authorization"];
    // Verify if exists token
    if (!header) {
      const error = serverErrors.errorUnauthorized;
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

module.exports = {
  signup,
  login,
  dashboard,
  verifyToken,
};
