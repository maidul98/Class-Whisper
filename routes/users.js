const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");
const nodemailer = require("nodemailer");

async function mailVerificacion() {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "mi252@cornell.edu, maidul98@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
    next();
  }
);

router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "You are not registered" });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const jwt = utils.issueJWT(user);
        res.json({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "Username or password is incorrect" });
      }

      next();
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/register", function (req, res, next) {
  console.log(req.body);
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    email: req.body.email,
  });

  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
      next();
    })
    .catch((err) => {
      const messages = [];
      if (err.name == "ValidationError") {
        for (field in err.errors) {
          messages.push(err.errors[field].message);
        }
      }
      res.status(400).send({ errors: messages });
    });
});

router.post("/forgot", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
      next();
    })
    .catch((err) => next(err));
});

module.exports = router;
