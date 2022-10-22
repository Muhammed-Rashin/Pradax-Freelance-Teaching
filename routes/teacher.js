const express = require("express");
const router = express.Router();
const teacherHelper = require("../controllers/teacher.auth.controller");
const multer = require("../utils/multerForTeacherProfile");
const multerForClassroom = require("../utils/multerForClassroom")
const auth = require("../middleware/auth");

router.get("/", teacherHelper.getTecherDashboard);

router.get("/createClassroom", teacherHelper.getCreateClassroom);

router.get("/becomeTeacher", teacherHelper.becomeTeacher);

router.get("/completeProfile", teacherHelper.completeProfile);

router.post("/completeProfile", multer.upload.any("profileImg"), teacherHelper.addProfile); 

router.post("/createClassroom", multerForClassroom.upload.any("thumbnail"), teacherHelper.createClassroom)

router.get("/manageStudents",teacherHelper.manageStudents)

router.get("/manageClass", teacherHelper.manageClass)

router.post("/createSection", teacherHelper.createSection)


module.exports = router;
