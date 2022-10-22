const mongoose = require("mongoose");
const studentModel = require("./student-model");
const { ObjectId } = require("mongoose/lib/schema");
const { object } = require("mongoose/lib/utils");
const { Object } = require("mongoose/lib/schema/index");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const teacherProfileModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    description: String,
    occupation: String,
    from: String,
    to: String,
    skills: Array,
    education: String,
    profileImage: String,
    certificateImage: String,
    status: String,
    date: Number,
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: studentModel,
    },
  },
  { timestamps: true }
);

teacherProfileModel.plugin(AutoIncrement, {
  userId: "order_seq",
  inc_field: "userId",
});

module.exports = mongoose.model("teacher", teacherProfileModel);
