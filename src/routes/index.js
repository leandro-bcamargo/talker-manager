const express = require("express");
const talkerRoutes = require("./talker.routes");

const router = express.Router();

router.use("/talker", talkerRoutes);

module.exports = router;
