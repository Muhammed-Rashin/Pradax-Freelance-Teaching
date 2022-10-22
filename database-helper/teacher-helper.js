const teacherModel = require("../models/teacher-model");
const classroomModel = require("../models/classroom-model");
const bcrypt = require("bcrypt");
const multer = require("../utils/multerForTeacherProfile");
const session = require("express-session");
const { request } = require("../app");
const sharp = require("sharp");

module.exports = {
  addTeacherProfile: async (teacherData) => {
    try {
      console.log(teacherData.reqSkills);
      teacherData.skills = [];
      if (Array.isArray(teacherData.reqSkills)) {
        teacherData.reqSkills.forEach((element, index) => {
          teacherData.skills.push({
            skill: element,
            skillLevel: teacherData.skillLevels[index],
          });
        });
      } else {
        teacherData.skills.push(
          {
            skill: teacherData.reqSkills,
            skillLevel: teacherData.skillLevels
          }
        );
      }

      console.log("After = " + teacherData.skills);
      teacherData.status = "Pending";
      try {
        const teacherSchema = new teacherModel(
          ({
            firstName,
            lastName,
            description,
            occupation,
            from,
            to,
            skills,
            education,
            profileImage,
            certificateImage,
            status,
            date,
            studentId,
          } = teacherData)
        );
        await teacherSchema.save().then(() => {
          console.log("Saved");
        });
      } catch (error) {
        console.error(error);
      }
    }
    catch (error) {
      console.log(error);
    }
  },

  getTeacherProfileData: async (id) => {
    try {
      let response = await teacherModel.findOne({ studentId: id });
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },

  checkTeacherCreatedAtLeastOneClass: async (id) => {
    try {
      let response = await classroomModel.findOne({ teacherId: id });
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  createClassroom: async (classroomData) => {
    try {

      classroomData.basicPlan = {
        fees: parseInt(classroomData.basicFees),
        activeDays: classroomData.basicDays,
        hours: parseInt(classroomData.basicHours),
        minuts: parseInt(classroomData.basicMinuts),
        chatSupport: classroomData.basicChat,
        exclusiveClass: classroomData.basicExclusiveClass,
        studyMetriels: classroomData.basicStudyMetriels,
        Certificate: classroomData.basicCertificates,
        description: classroomData.basicDescription,
      };
      classroomData.standardPlan = {
        fees: parseInt(classroomData.standardFees),
        activeDays: classroomData.standardDays,
        hours: parseInt(classroomData.standardHours),
        minuts: parseInt(classroomData.standardMinuts),
        chatSupport: classroomData.standardChat,
        exclusiveClass: classroomData.standardExclusiveClass,
        studyMetriels: classroomData.standardStudyMetriels,
        Certificate: classroomData.standardCertificates,
        description: classroomData.standardDescription,
      };
      classroomData.premiumPlan = {
        fees: parseInt(classroomData.premiumFees),
        activeDays: classroomData.premiumDays,
        hours: parseInt(classroomData.premiumHours),
        minuts: parseInt(classroomData.premiumMinuts),
        chatSupport: classroomData.premiumChat,
        exclusiveClass: classroomData.premiumExclusiveClass,
        studyMetriels: classroomData.premiumStudyMetriels,
        Certificate: classroomData.premiumCertificates,
        description: classroomData.premiumDescription,
      };
      classroomData.status = "Pending";
      try {
        const classroomSchema = new classroomModel(
          ({
            title,
            category,
            subCategory,
            topics,
            description,
            basicPlan,
            standardPlan,
            premiumPlan,
            bannerImage,
            thumbnailImage1,
            thumbnailImage2,
            thumbnailImage3,
            status,
            teacherId,
          } = classroomData)
        );
        await classroomSchema.save().then(() => {
          console.log("Saved");
        });
      } catch (error) {
        console.error(error);
      }
    }
    catch (error) {
      console.log(error);
    }
  },

  getClassrooms: async (id) => {
    try {
      let response = await classroomModel.find({ teacherId: id });
      response.forEach((value) => {
        value.studentsCount = value.studentsJoined.length;
      });
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  getStudentDetails: async (id) => {
    try {
      let response = await classroomModel
        .findOne({ _id: id })
        .populate("studentsJoined.studentId");
      response.basicStudents = [];
      response.standardStudents = [];
      response.premiumStudents = [];
      response.studentsJoined.forEach((element) => {
        if (element.plan == "Basic") {
          response.basicStudents.push(element);
        }
        if (element.plan == "Standard") {
          response.standardStudents.push(element);
        }
        if (element.plan == "Premium") {
          response.premiumStudents.push(element);
        }
      });
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  createSection: async (id, data) => {
    try {
      if (data.plan == "Basic")
        await classroomModel.updateOne(
          { _id: id },
          { "basicPlan.latestClass": data }
        );

      if (data.plan == "Standard")
        await classroomModel.updateOne(
          { _id: id },
          { "standardPlan.latestClass": data }
        );

      if (data.plan == "Premium")
        await classroomModel.updateOne(
          { _id: id },
          { "premiumPlan.latestClass": data }
        );
    } catch (error) {
      console.log((message = error));
    }
  },
};
