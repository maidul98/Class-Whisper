const mongoose = require("mongoose");
const router = require("express").Router();
const axios = require("axios");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Class = mongoose.model("Class");
const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");
const passport = require("passport");
const utils = require("../lib/utils");
var async = require("async");

/**
 * Start a new convo or send message to an exisiting convo
 */
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    Conversation.findOne({ participants: { $in: [req.user._id] } })
      .then((convo) => {
        console.log(convo);
        if (convo) {
          Message.create({
            conversation_id: convo._id,
            sender: req.user._id,
            message: req.body.body,
          })
            .then((messageSent) => {
              res.send({ msg: "Message sent" });
            })
            .catch((error) => {
              res.status(500);
            });
        } else {
          Post.findOne({ _id: req.body.post_id })
            .populate("user")
            .then((post) => {
              if (post && String(req.user._id) != String(post.user._id)) {
                Conversation.create({
                  participants: [req.user._id, post.user._id],
                }).then((newConvo) => {
                  Message.create({
                    conversation_id: newConvo._id,
                    sender: req.user._id,
                    message: req.body.body,
                  })
                    .then((messageSent) => {
                      res.send({ msg: "Message sent" });
                    })
                    .catch((error) => {
                      res.status(500);
                    });
                });
              } else {
                res.status(500).send("An error has occured");
              }
            });
        }
      })
      .catch((error) => {
        console.log("error");
        res.status(500).send("Something went wrong when sending the message");
      });
  }
);

module.exports = router;
