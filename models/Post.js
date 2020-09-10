const mongoose = require("mongoose");
const User = require("./user");

/**
 * TODO
 * post title, user, votes..
 */
const PostSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  body: String,
  votes: {
    type: mongoose.Types.ObjectId,
    ref: "Vote",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments_count: {
    type: Number,
    default: 0,
  },
  class_id: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

mongoose.model("Post", PostSchema);
