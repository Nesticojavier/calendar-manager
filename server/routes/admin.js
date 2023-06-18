const express = require("express");
const router = express.Router();
const { verifyTokenADMIN } = require("../controllers/auth.controller");

const {
  usersList,
  login,
  updatepwd,
} = require("../controllers/admin.controller");

router.get("/userslist", usersList);

router.get("/updatepwd", updatepwd);

router.post("/login", login);

module.exports = router;
