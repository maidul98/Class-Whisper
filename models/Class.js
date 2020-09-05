const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  catalogNbr: String,
  subject: String,
  titleShort: String,
  description: String,
  crseId: Number,
  term: String,
  titleLong: String,
  completeTitle: String,
  enrollments: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

mongoose.model("Class", ClassSchema);
