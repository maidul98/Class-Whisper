const mongoose = require("mongoose");
const router = require("express").Router();
const axios = require("axios");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Class = mongoose.model("Class");
const passport = require("passport");
const utils = require("../lib/utils");

/**
 * Get post by id
 */
router.get("get/:id", function (req, res, next) {
  Post.findById(req.params.id)
    .then((post) => {
      console.log(post);
      res.send(post);
    })
    .catch((err) => console.log(err));
});

/**
 * Get all posts
 */
router.get("/", function (req, res, next) {
  console.log("running new");
  let query = {};
  if (req.query.classId != undefined) {
    query = { class_id: req.query.classId };
  }

  Post.find(query)
    .populate("class_id")
    .populate({ path: "user", select: "-hash -salt" })
    .sort({ createdAt: -1 })
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
});

/**
 * return all posts ordered by time and highest votes
// Formula is the same as the Reddit "Hot" algorithm, found here:
// https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
 */
router.get("/trending-posts", function (req, res, next) {
  let query = {};
  if (req.query.classId != undefined) {
    query = { class_id: req.query.classId };
  }

  console.log(query);

  Post.find(query)
    .populate("class_id")
    .populate({ path: "user", select: "-hash -salt" })
    .then((posts) => {
      console.log(posts);
      res.send(
        posts.sort(function (a, b) {
          var seconds = Date.parse(a.createdAt) / 1000 - 1134028003;
          var order = Math.log10(Math.max(Math.abs(a.votes), 1));
          var sign = a.votes > 0 ? 1 : a.votes < 0 ? -1 : 0;
          var aScore = Math.round(sign * order + seconds / 45000, 7);
          seconds = Date.parse(b.createdAt) / 1000 - 1134028003;
          order = Math.log10(Math.max(Math.abs(b.votes), 1));
          sign = b.votes > 0 ? 1 : b.votes < 0 ? -1 : 0;
          var bScore = Math.round(sign * order + seconds / 45000, 7);
          var comp = 0;
          if (aScore > bScore) comp = -1;
          else if (aScore < bScore) comp = 1;
          return comp;
        })
      );
    })
    .catch((error) => console.log(error));

  // Post.find({}, (error, posts) => {

  //   res.send(
  //     posts.sort(function (a, b) {
  //       var seconds = Date.parse(a.createdAt) / 1000 - 1134028003;
  //       var order = Math.log10(Math.max(Math.abs(a.votes), 1));
  //       var sign = a.votes > 0 ? 1 : a.votes < 0 ? -1 : 0;
  //       var aScore = Math.round(sign * order + seconds / 45000, 7);
  //       seconds = Date.parse(b.createdAt) / 1000 - 1134028003;
  //       order = Math.log10(Math.max(Math.abs(b.votes), 1));
  //       sign = b.votes > 0 ? 1 : b.votes < 0 ? -1 : 0;
  //       var bScore = Math.round(sign * order + seconds / 45000, 7);
  //       var comp = 0;
  //       if (aScore > bScore) comp = -1;
  //       else if (aScore < bScore) comp = 1;
  //       return comp;
  //     })
  //   );
  // });
});

/** Make a post */
router.post("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  Class.findOne({ _id: req.body.class, enrollments: { $in: [req.user._id] } })
    .then((data) => {
      if (data != null) {
        Post.create({
          title: req.body.title,
          body: req.body.body,
          class_id: req.body.class,
          user: req.user._id,
        })
          .then((data) => {
            res.send(data);
          })
          .catch((error) => {
            res.status(500);
          });
      } else {
        throw Error("Class not found");
      }
    })
    .catch((error) => res.status(500));
});

module.exports = router;
