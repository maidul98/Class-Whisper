const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

mongoose.model("Conversation", NotificationsSchema);
