const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  dashboard,
  showUsers,
} = require("../controllers/users.controllers");

// Show all users
router.get("/users", showUsers);
// Signup
router.post("/signup", signup);
// Login
router.post("/login", login);
// User dashboard
router.get("/dashboard", dashboard);

module.exports = router;
