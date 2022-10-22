const express = require("express");
const router = express.Router();
const studentHelper = require("../controllers/student.auth.controller");

router.get("/", function (req, res, next) {
  res.send("This is Teacher page");
});

router.post("/", studentHelper.signup);

router.post("/isUserNameExist", studentHelper.isUserNameExist);

module.exports = router;
