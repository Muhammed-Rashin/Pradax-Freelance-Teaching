const mongoose = require("mongoose");
// let classroomModel = require('./classroom-model')
const studentModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    mobile: Number,
    joinedClasses:Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentModel);
