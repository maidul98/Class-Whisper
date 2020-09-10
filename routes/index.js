const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/posts", require("./posts"));

router.use("/classes", require("./classes"));

router.use("/search", require("./search"));

router.use("/comments", require("./comments"));

router.use("/notifications", require("./notifications"));

router.use("/votes", require("./votes"));

module.exports = router;
