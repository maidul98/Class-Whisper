const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const validateEmail = function (email) {
  return /@cornell\.edu$/.test(email);
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hash: String,
  salt: String,
  verified: {
    type: Boolean,
    default: false,
  },
  suspended: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "Please enter a valid Cornell email"],
    unique: [true, "Username is taken"],
  },
});

UserSchema.plugin(uniqueValidator), { message: "{PATH} is already in use" };

mongoose.model("User", UserSchema);
