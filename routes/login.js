const express = require("express");
const router = express.Router();
// const popupS = require('popups');

const studentModel = require("../models/student-model");
const teacherHelper = require("../controllers/teacher.auth.controller");
const bcrypt = require("bcrypt");
const teacherModel = require("../models/teacher-model");

router.get("/", function (req, res) {});

router.post("/", async (req, res) => {
  //checking user's login data is in Student's collection
  studentModel.findOne({ username: req.body.username }, (err, doc) => {
    if (doc) {
      bcrypt.compare(req.body.password, doc.password, (err, status) => {
        //Login success
        if (status) {
          req.session.user = doc;
          res.json('Success');
        }
        //Incorrect login
        else {
          res.json('Reject');
        }
      });
    }
  });
});

router.post("/logout", (req,res) => {
     req.session.user = null;
  req.session.teacher = null;
  res.redirect("/")
})

module.exports = router;
