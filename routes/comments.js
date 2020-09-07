const mongoose = require("mongoose");
const router = require("express").Router();
const axios = require("axios");
const passport = require("passport");
const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");
/**
 * Create a comment for a post
 */
router.post("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  console.log(req.body.body);
  Post.findById(req.body.post_id)
    .then((result) => {
      if (result) {
        Comment.create({
          post: req.body.post_id,
          user: req.user._id,
          body: req.body.body,
        })
          .then(async (newComment) => {
            newComment = await newComment.populate("user").execPopulate();
            res.send(newComment);
          })
          .catch((error) =>
            res.status(500).send({ msg: "error creating new comment" })
          );
      } else {
        throw Error("Not a valid post");
      }
    })
    .catch((error) => res.status(500).send({ msg: "error finding post" }));
});

/**
 * get all comments for a post
 */
router.get("/", function (req, res, next) {
  Comment.find({
    post: req.query.id,
    parent: { $exists: false },
  })
    .populate({ path: "user", select: "-hash -salt" })
    .populate("replies")
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch(() => res.status(500));
});

/**
 * Create reply to a parent post
 */
router.post(
  "/reply",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log(req.body);
    Post.findById(req.body.post_id)
      .then((result) => {
        if (result) {
          Comment.create({
            post: req.body.post_id,
            user: req.user._id,
            body: req.body.body,
            parent: req.body.comment_parent_id,
          })
            .then(async (newReply) => {
              newReply = await newReply.populate("user").execPopulate();
              //update the replies counter for the parent comment
              Comment.updateOne(
                { _id: req.body.comment_parent_id },
                { $inc: { repliesCount: 1 } }
              )
                .then(() => {
                  console.log(newReply);
                  res.send(newReply);
                })
                .then(() => {
                  console.log("error1");
                  res.status(500);
                });
            })
            .catch((error) => {
              console.log("error2");
              res.status(500);
            });
        } else {
          console.log("error3");
          res.status(500);
        }
      })
      .catch((error) => res.status(500));
  }
);

/**
 * Get replies for a comment
 */
router.get("/reply", function (req, res, next) {
  console.log(req.body);
  Comment.find({
    parent: req.query.parentId,
  })
    .populate({ path: "user", select: "-hash -salt" })
    .sort({ createdAt: 1 })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500);
      }
    })
    .catch();
});

module.exports = router;
