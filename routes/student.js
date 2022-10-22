const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.auth.controller");

router.get("/", controller.dashboard);

router.post("/student-signup", controller.signup);

router.get("/class-details", controller.classDetails);

router.post("/payment", controller.doPayment);

router.post("/verify-payment", controller.verifyPayment);

router.get("/classrooms", controller.classrooms);

module.exports = router;
