const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/auth.controller");
const { showTags } = require("../controllers/utils.controller");

verifyToken(process.env.USERS_ENCRYPT);
// Obtain all tags
router.get("/tags", showTags);

module.exports = router;
