const mongoose = require("mongoose");
const router = require("express").Router();
const axios = require("axios");
const Post = mongoose.model("Post");
const Class = mongoose.model("Class");
const Votes = mongoose.model("Vote");
const passport = require("passport");
const utils = require("../lib/utils");

/**
 * Get post by id
 */
router.get("/single", function (req, res, next) {
  Post.findById(req.query.postId)
    .populate({ path: "user", select: "-hash -salt -email" })
    .populate("class_id")
    .populate("votes")
    .populate("class_id")
    .then((post) => {
      res.send(post);
    })
    .catch((err) => res.send({ msg: "There was an error" }));
});

/**
 * Get all posts ordered by time
 */
router.get("/new", function (req, res, next) {
  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;
  let query = {};
  if (req.query.classId != undefined) {
    query = { class_id: req.query.classId };
  }

  Post.find(query, undefined, { skip, limit: 20 })
    .populate("class_id")
    .populate("votes")
    .populate({ path: "user", select: "-hash -salt -email" })
    .sort({ createdAt: -1 })
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
});

/**
 * return all posts ordered by time and highest votes
// Formula is the same as the Reddit "Hot" algorithm, found here:
// https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
 */

function hot(score, date) {
  var order = Math.log(Math.max(Math.abs(score), 1)) / Math.LN10;
  var sign = score > 0 ? 1 : score < 0 ? -1 : 0;
  var seconds = date.getTime() / 1000 - 1134028003;
  var product = order + (sign * seconds) / 45000;
  return Math.round(product * 10000000) / 10000000;
}

router.get("/trending-posts", function (req, res, next) {
  let query = {};
  if (req.query.classId != undefined) {
    query = { class_id: req.query.classId };
  }

  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

  Post.find(query, undefined, { skip, limit: 20 })
    .populate("class_id")
    .populate("votes")
    .populate({ path: "user", select: "-hash -salt -email" })
    .then((posts) => {
      res.send(
        posts.sort(function (a, b) {
          const scoreA = hot(a.votes.voteCounts, a.createdAt);
          const scoreB = hot(b.votes.voteCounts, b.createdAt);

          var comp = 0;
          if (scoreA > scoreB) comp = -1;
          else if (scoreA < scoreB) comp = 1;
          return comp;
        })
      );
    })
    .catch((error) => console.log(error));
});

/**
 * Get all posts for all the classes user is apart of by trending
 */

router.get(
  "/my-trending-posts",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 0;

    Class.find({ enrollments: { $in: [req.user._id] } })
      .then((classes) => {
        const class_ids = classes.map((current_class) => current_class._id);
        Post.find({ class_id: { $in: class_ids } }, undefined, {
          skip,
          limit: 20,
        })
          .populate("class_id")
          .populate("votes")
          .populate({ path: "user", select: "-hash -salt -email" })
          .then((posts) => {
            res.send(
              posts.sort(function (a, b) {
                const scoreA = hot(a.votes.voteCounts, a.createdAt);
                const scoreB = hot(b.votes.voteCounts, b.createdAt);

                var comp = 0;
                if (scoreA > scoreB) comp = -1;
                else if (scoreA < scoreB) comp = 1;
                return comp;
              })
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        res.status(500);
      });
  }
);

/**
 * Make a post
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    const secret = process.env.GOOGLE_RECAP;
    const response = req.body["reCAPTCHA"];
    const validateRecaptcha = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      }
    );
    console.log(validateRecaptcha.data);
    if (validateRecaptcha.data.success == false) {
      return res.status(500).send({ msg: "Failed challage, please try again" });
    }

    Class.findOne({ _id: req.body.class, enrollments: { $in: [req.user._id] } })
      .then((data) => {
        if (data != null) {
          Post.create({
            title: req.body.title,
            body: req.body.body,
            class_id: req.body.class,
            user: req.user._id,
          })
            .then((post) => {
              Votes.create({
                post: post._id,
                upvoters: [req.user._id],
                voteCounts: 1,
              }).then((newVotes) => {
                Post.findByIdAndUpdate(
                  {
                    _id: post._id,
                  },
                  { votes: newVotes._id },
                  { new: true }
                )
                  .populate("class_id")
                  .populate("votes")
                  .then((updatedPost, obj) => {
                    res.send(updatedPost);
                  });
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500);
            });
        } else {
          throw Error("Class not found");
        }
      })
      .catch((error) => res.status(500));
  }
);

module.exports = router;
