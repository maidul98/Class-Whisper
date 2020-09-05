const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const Class = mongoose.model("Class");
const ClassEnrollment = mongoose.model("ClassEnrollment");
const passport = require("passport");
const utils = require("../lib/utils");
const e = require("express");

/**
 * TODO
 * join class
 */
router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    Class.updateOne(
      { _id: req.query.classId },
      { $addToSet: { enrollments: req.user._id } }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.send(500);
      });
  }
);

/**
 * TODO
 * leave class
 */
router.post(
  "/leave",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    Class.updateOne(
      { _id: req.query.classId },
      { $pull: { enrollments: req.user._id } }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((erorr) => {
        res.send(500);
      });
  }
);

/**
 * Check if user is enrolled in class or not
 */
router.get(
  "/check-enrollment",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    Class.find({
      _id: req.query.classId,
      enrollments: { $in: [req.user._id] },
    }).then((data) => {
      if (data.length == 0) {
        res.send({ enrollmentStatus: false });
      } else {
        res.send({ enrollmentStatus: true });
      }
    });
  }
);

/**
 * returns an array of classes the user is apart of
 */
router.get(
  "/myclasses",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    Class.find({ enrollments: { $in: [req.user._id] } })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500);
      });
  }
);

/**
 * returns an array of classes the user is apart of
 */
router.get("/info", async function (req, res, next) {
  const term = req.query.term;
  const subject = req.query.subject;
  const classNum = req.query.classNum;
  try {
    const classInfo = await Class.findOne({
      term: term.toUpperCase(),
      subject: subject.toUpperCase(),
      catalogNbr: classNum,
    });
    res.send(classInfo);
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;
