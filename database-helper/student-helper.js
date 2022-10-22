const studentModel = require("../models/student-model");
const teacherModel = require("../models/teacher-model");
const categoryModel = require("../models/category-model");
const classroomModel = require("../models/classroom-model");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { response } = require("../app");

module.exports = {
  studentSignup: async (studentData) => {
    try {
      studentData.password = await bcrypt.hash(studentData.password, 10);
      const studentSchema = new studentModel(
        ({ firstName, lastName, username, mobile, password } = studentData)
      );

      result = await studentSchema.save();
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  isUserNameExist: async (Data) => {
    try {
      let result = await studentModel.findOne({ username: Data.username }),
        status = result ? false : true;
      return status;
    } catch (error) {
      return (message = error);
    }
  },
  getClassrooms: async () => {
    try {
      let response = await classroomModel.find().populate("teacherId");
      response.approved = [];
      response.pending = [];
      response.rejected = [];
      response.forEach((element) => {
        if (element.status == "Approved") {
          response.approved.push(element);
        } else if (element.status == "Pending") {
          response.pending.push(element);
        } else if (element.status == "Rejected") {
          response.rejected.push(element);
        }
      });
      console.log("Hello" + response);
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  getClassDetails: async (id) => {
    try {
      let response = await classroomModel
        .findOne({ _id: id })
        .populate("teacherId");
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  addStudentToClass: async (data) => {
    await classroomModel.updateOne(
      { _id: data.classId },
      {
        $push: {
          studentsJoined: {
            studentId: data.studentId,
            plan: data.classPlan,
          },
        },
      }
    );

    await studentModel.updateOne(
      { _id: data.studentId },
      {
        $push: {
          joinedClasses: {
            classId: data.classId,
            plan: data.classPlan,
          },
        },
      }
    );
  },
  getClassroomsThatStudentJoined: async (id) => {
    try {
      let response = await studentModel.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $unwind: {
            path: "$joinedClasses",
          },
        },
        {
          $lookup: {
            from: "classrooms",
            localField: "joinedClasses.classId",
            foreignField: "_id",
            as: "class",
          },
        },
      ]);

      response.forEach((element, index) => {
        if (element.joinedClasses.plan == "Basic") {
          element.nextClass = response[index].class[0].basicPlan.latestClass;
        }

        if (element.joinedClasses.plan == "Standard") {
          element.nextClass = response[index].class[0].standardPlan.latestClass;
        }

        if (element.joinedClasses.plan == "Premium") {
          element.nextClass = response[index].class[0].premiumPlan.latestClass;
        }
      });

      if (response) console.log("DDDDD = ", response);
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  getStudent: async (id) => {
    let student = await studentModel.findOne({ _id: id });
    return student;
  },
  getTeacher: async () => {
    let teacher = await teacherModel.find();
    return teacher;
  },
};
