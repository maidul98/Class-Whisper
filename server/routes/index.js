const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/posts", require("./posts"));

router.use("/classes", require("./classes"));

router.use("/search", require("./search"));

module.exports = router;
