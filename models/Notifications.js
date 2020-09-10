const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Types.ObjectId, ref: "User" },
  read: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  post: { type: mongoose.Types.ObjectId, ref: "Post" },
  preposition: {
    type: String,
    required: true,
  },
});

mongoose.model("Notifications", NotificationsSchema);
