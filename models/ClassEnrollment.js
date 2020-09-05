const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  classId: String,
  user: Object,
});

mongoose.model("ClassEnrollment", EnrollmentSchema);
