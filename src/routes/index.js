const express = require("express");
const talkerRoutes = require("./talker.routes");
const loginRoutes = require("./login.routes");

const router = express.Router();

router.use("/talker", talkerRoutes);
router.use("/login", loginRoutes);

module.exports = router;
