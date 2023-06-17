const express = require("express");
const router = express.Router();

const {
    usersList,
} = require("../controllers/admin.controller");

router.get("/userslist", usersList);

module.exports = router;