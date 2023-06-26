const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  dashboard,
  verifyToken
} = require("../controllers/auth.controller");

// Signup
router.post("/signup", signup);
// Login
router.post("/login", login);
// User dashboard -- protected route
router.get("/dashboard", verifyToken(process.env.USERS_ENCRYPT), dashboard);

module.exports = router;
