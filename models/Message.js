const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  conversation_id: {
    type: mongoose.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
});

mongoose.model("Message", NotificationsSchema);
