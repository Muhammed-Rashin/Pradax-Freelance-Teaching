const express = require("express");
const adminAuthController = require("../controllers/admin.auth.controller");
const router = express.Router();
const controller = require("../controllers/admin.auth.controller");

router.get("/", controller.getAdminDashboard);
router.get("/login", controller.adminLogin);
router.post("/login", controller.doAdminLogin);
router.get("/teacher/profile-requests", controller.getTeacherProfileRequests);
router.get(
  "/teacher/profile-requests-preview",
  controller.getTeacherProfileRequestsPreview
);
router.post(
  "/teacher/profile-requests-preview/approve",
  controller.approveTeacherProfileRequest
);
router.post(
  "/teacher/profile-requests-preview/reject",
  controller.rejectTeacherProfileRequest
);
router.get("/category", adminAuthController.getCategory);
router.post("/category", adminAuthController.getCategoryForTree);
router.post("/category/addCategory", adminAuthController.addCategory);
router.post("/category/addSubCategory", adminAuthController.addSubCategory);
router.get("/classroom-requests", controller.getClassroomRequests);

module.exports = router;
