const { response } = require("express");
const adminHelper = require("../database-helper/admin-helper");
const timeAgo = require("../utils/timeAgo");
const bcrypt = require("bcrypt");
let incorrectAlert = false;
module.exports = {
  adminLogin: async (req, res) => {
    if (req.session.admin) res.redirect("/admin");
    else res.render("admin/adminLogin", { layout: false, incorrectAlert });
    incorrectAlert = false
  },
  doAdminLogin: async (req, res) => {
    console.log(req.body);
    let response = await adminHelper.doAdminLogin(req.body);
    if (response) {
      let result = await bcrypt.compare(req.body.password, response.password);
      if (result) {
        req.session.admin = true;
        res.redirect("/admin");
      } else {
        incorrectAlert = true;
        res.redirect("/admin/login");
      }
    } else {
      incorrectAlert = true;
      res.redirect("/admin/login");
    }
  },
  getAdminDashboard: async (req, res) => {
    if (req.session.admin) {
      let response = await adminHelper.getCategory();
      res.render("admin/admin", { layout: "layout/adminLayout", response });
    } else {
      res.redirect("/admin/login");
    }
  },

  getTeacherProfileRequests: async (req, res, next) => {
    let response = await adminHelper.getProfileRequests();
    timeAgo.getLastSeen(response);
    res.render("admin/teacherRequests", {
      layout: "layout/adminLayout",
      response,
    });
  },
  getTeacherProfileRequestsPreview: async (req, res, next) => {
    let response = await adminHelper.getProfileRequestPreview(req.query.id);
    // timeAgo.getLastSeen(response);
    res.render("admin/teacherRequestPreview", { layout: false, response });
  },
  approveTeacherProfileRequest: async (req, res, next) => {
    await adminHelper.approveTeacherProfileRequest(req.query.id);
    res.redirect("/admin");
  },
  rejectTeacherProfileRequest: async (req, res, next) => {
    await adminHelper.rejectTeacherProfileRequest(req.query.id);
    res.redirect("/teacher/profile-requests");
  },

  getCategory: async (req, res, next) => {
    let response = await adminHelper.getCategory();

    res.render("admin/category", { layout: false, response });
  },

  getCategoryForTree: async (req, res, next) => {
    let response = await adminHelper.getCategory();
    res.status(200).json(response);
  },

  addCategory: async (req, res) => {
    await adminHelper.addCategory(req.body);
    res.redirect("/admin");
  },

  addSubCategory: async (req, res) => {
    await adminHelper.addSubCategory(req.body);
    res.redirect("/admin");
  },
  getClassroomRequests: async (req, res) => {
    let response = await adminHelper.getClassroomRequests();

    timeAgo.getLastSeen(response);

    res.render("admin/classroomRequests", {
      layout: "layout/adminLayout",
      response,
    });
  },
};
