const teacherHelper = require("../database-helper/teacher-helper");
const multer = require("../utils/multerForTeacherProfile");
const multerForClassroom = require("../utils/multerForClassroom");
const session = require("express-session");
const { array } = require("mongoose/lib/utils");

exports.getTecherDashboard = async (req, res) => {
  try {
    let response = await teacherHelper.getClassrooms(req.session.teacher._id);
    res.render("teacher/teacher", { response });
  } catch (error) {
    console.log(error);
  }
};

exports.getCreateClassroom = async (req, res) => {
  res.render("teacher/createNewClassroom");
};

exports.becomeTeacher = async (req, res) => {
  try {
    let response = await teacherHelper.getTeacherProfileData(
      req.session.user._id
    );
    req.session.teacher = response;

    if (response) {
      if (response.status == "Rejected") res.render("teacher/rejected");
      else if (response.status == "Pending") res.render("teacher/pending");
      else {
        let result = await teacherHelper.checkTeacherCreatedAtLeastOneClass(
          req.session.teacher._id
        );
        if (result) res.redirect("/teacher");
        else res.redirect("/teacher/createClassroom");
      }
    } else {
      response = {};
      if (response.status == undefined) res.render("teacher/instruction");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.completeProfile = (req, res) => {
  try {
    res.render("teacher/completeProfile");
  } catch (error) {
    console.log(error);
  }
};
exports.addProfile = async (req, res) => {
  try {
    console.log(req.body);
    req.body.profileImage = multer.profileImageName + req.profileImageExt;
    req.body.certificateImage =
      multer.certificateImageName + req.certificateImageExt;
    req.body.studentId = req.session.user._id;
    await teacherHelper.addTeacherProfile(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.createClassroom = (req, res) => {
  try {
    req.body.bannerImage =
      multerForClassroom.bannerImageName + req.bannerImageExt;
    req.body.thumbnailImage1 =
      multerForClassroom.thumbnailImageName1 + req.thumbnailImage1Ext;
    req.body.thumbnailImage2 =
      multerForClassroom.thumbnailImageName2 + req.thumbnailImage2Ext;
    req.body.thumbnailImage3 =
      multerForClassroom.thumbnailImageName3 + req.thumbnailImage3Ext;
    req.body.teacherId = req.session.teacher._id;
    console.log("Teacherdaa " + req.body.teacherId);
    teacherHelper.createClassroom(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.manageStudents = async (req, res) => {
  try {
    let response = await teacherHelper.getStudentDetails(req.query.id);
    res.render("teacher/manageStudents", { response });
  } catch (error) {
    console.log(error);
  }
};

exports.manageClass = async (req, res) => {
  try {
    let response = await teacherHelper.getStudentDetails(req.query.id);
    res.render("teacher/manageClass", { response });
  } catch (error) {
    console.log(error);
  }
};

exports.createSection = async (req, res) => {
  try {
    await teacherHelper.createSection(req.query.id, req.body);
    res.redirect("/teacher/manageClass");
  } catch (error) {
    console.log(error);
  }
};
