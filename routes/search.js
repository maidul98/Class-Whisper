const mongoose = require("mongoose");
const router = require("express").Router();
const axios = require("axios");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Class = mongoose.model("Class");
const passport = require("passport");
const utils = require("../lib/utils");
var async = require("async");

/**
 * Get post by id
 */
router.get("/class", async function (req, res, next) {
  const query = req.query.query;

  const results = await Class.find({
    completeTitle: { $regex: `${query}`, $options: "i" },
  }).limit(50);

  res.send(results);
});

module.exports = router;
