const session = require("express-session");
const studentHelper = require("../database-helper/student-helper");
const razorpay = require("../utils/razorpay");

exports.dashboard = async (req, res) => {
  let response = await studentHelper.getClassrooms();
  let student = await studentHelper.getStudent(req.session.user._id);
  let teacher = await studentHelper.getTeacher();
  res.render("student/student", { response,student,teacher });
};

exports.signup = async (req, res) => {
  let result = await studentHelper.studentSignup(req.body);
  req.session.user = result;
  res.redirect("/student");
};

exports.isUserNameExist = async (req, res) => {
  let response = await studentHelper.isUserNameExist(req.body);
  if (response) {
    res.status(200).json({ status: true });
  } else {
    res.status(200).json({ status: false });
  }
};

exports.classDetails = async (req, res) => {
  let response = await studentHelper.getClassDetails(req.query.id);

  res.render("student/classDetails", { response });
};

exports.doPayment = async (req, res) => {
  req.session.class = req.query.id;
  let response = await studentHelper.getClassDetails(req.query.id);
  razorpay
    .generateRazorpayForBasicPlan(response, req.body.plan)
    .then((data) => {
      res.json(data);
    });
};

exports.verifyPayment = async (req, res) => {
  console.log(req.body);
  razorpay
    .verifyPayment(req.body)
    .then(async (data) => {
      let details = {
        classId: req.session.class,
        studentId: req.session.user._id,
        classPlan: req.body.classPlan,
      };
      await studentHelper.addStudentToClass(details);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.classrooms = async (req, res) => {
  let response = await studentHelper.getClassroomsThatStudentJoined(req.session.user._id)
  // console.log(response);
  console.log(response);
  res.render('student/classrooms',{response})
};
