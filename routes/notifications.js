const mongoose = require("mongoose");
ObjectId = require("mongodb").ObjectId;
const router = require("express").Router();
const Notifications = mongoose.model("Notifications");
const passport = require("passport");
const utils = require("../lib/utils");

/**
 * get all  notifs
 */
router.get(
  "/unread",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      console.log(req.user._id);
      const notifs = await Notifications.find({
        receiver: req.user._id,
      })
        .populate({ path: "receiver", select: "-hash -salt" })
        .populate({ path: "sender", select: "-hash -salt" })
        .populate({ path: "post" })
        .sort({ createdAt: -1 });
      if (notifs) {
        res.send(notifs);
      } else {
        res.send([]);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
);

/**
 * mark notif as read
 */
router.post(
  "/read",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      await Notifications.update(
        {
          _id: { $in: req.body.notif_ids },
          receiver: req.user._id,
        },
        { $set: { read: true } },
        { multi: true }
      );
      console.log(req.body);
      res.send({ msg: "marked as read" });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
);

/**
 * check for notifications
 */
router.get(
  "/count",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const count = await Notifications.count({
        receiver: req.user._id,
        read: false,
      });
      console.log(req.user._id);
      res.send({ count: count });
    } catch (error) {}
  }
);

module.exports = router;
