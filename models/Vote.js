const mongoose = require("mongoose");

const Vote = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
  upvoters: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  downvoters: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  voteCounts: {
    default: 0,
    type: Number,
  },
});

mongoose.model("Vote", Vote);
