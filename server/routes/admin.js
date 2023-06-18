const express = require("express");
const router = express.Router();
const { verifyTokenADMIN } = require("../controllers/auth.controller");

const {
  usersList,
  login,
  updatepwd,
} = require("../controllers/admin.controller");

router.get("/userslist", verifyTokenADMIN, usersList);

router.put("/updatepwd", verifyTokenADMIN, updatepwd);

router.post("/login", login);

module.exports = router;
