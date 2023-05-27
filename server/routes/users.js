const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  dashboard,
  showUsers,
  verifyToken
} = require("../controllers/users.controllers");

// show all users
router.get("/users", showUsers);
// Signup
router.post("/signup", signup);
// Login
router.post("/login", login);
// User dashboard -- protected route
router.get("/dashboard", verifyToken, dashboard);

module.exports = router;
