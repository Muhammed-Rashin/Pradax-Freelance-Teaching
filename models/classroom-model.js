const mongoose = require("mongoose");
const teacherModel = require("./teacher-model");
const studentModel = require("../models/student-model");

const { ObjectId } = require("mongoose/lib/schema");
const { object } = require("mongoose/lib/utils");
const { Object } = require("mongoose/lib/schema/index");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const classroomModel = new mongoose.Schema(
  {
    title: String,
    category: String,
    subCategory: String,
    topics: Array,
    description: String,
    basicPlan: Object,
    standardPlan: Object,
    premiumPlan: Object,
    bannerImage: String,
    thumbnailImage1: String,
    thumbnailImage2: String,
    thumbnailImage3: String,
    studentsJoined: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: studentModel,
        },
        plan: String,
      },
    ],
    // latestClass: Object,
    // previousClasses : Array,
    status: String,
    date: Number,
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: teacherModel,
    },
  },
  { timestamps: true }
);

classroomModel.plugin(AutoIncrement, {
  classId: "order_seq",
  inc_field: "classId",
});

module.exports = mongoose.model("classroom", classroomModel);
