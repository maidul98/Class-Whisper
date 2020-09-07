const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: false,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
  repliesCount: {
    type: Number,
    default: 0,
  },
});

mongoose.model("Comment", CommentSchema);
