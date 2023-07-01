const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/auth.controller");

const {
  usersList,
  login,
  updatepwd,
} = require("../controllers/admin.controller");

router.get("/userslist", verifyToken(process.env.ADMIN_ENCRYPT), usersList);

router.put("/updatepwd", verifyToken(process.env.ADMIN_ENCRYPT), updatepwd);

router.post("/login", login);

module.exports = router;
