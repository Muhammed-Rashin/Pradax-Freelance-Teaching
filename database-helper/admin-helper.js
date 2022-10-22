const { forEach } = require("mongoose/lib/helpers/specialProperties");
const studentModel = require("../models/student-model");
const teacherModel = require("../models/teacher-model");
const categoryModel = require("../models/category-model");
const classroomModel = require("../models/classroom-model");
const adminModel = require("../models/admin-model");

module.exports = {
  doAdminLogin: async (data) => {
    let response = await adminModel.findOne({ email: data.email });
    return response;
  },
  getProfileRequests: async () => {
    try {
      let response = await teacherModel.find().populate("studentId");
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
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  getProfileRequestPreview: async (id) => {
    try {
      let response = await teacherModel
        .findOne({ _id: id })
        .populate("studentId");
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  approveTeacherProfileRequest: async (id) => {
    try {
      await teacherModel.updateOne({ _id: id }, { status: "Approved" });
    } catch (error) {
      console.log((message = error));
    }
  },
  rejectTeacherProfileRequest: async (id) => {
    try {
      await teacherModel.updateOne({ _id: id }, { status: "Rejected" });
    } catch (error) {
      console.log((message = error));
    }
  },
  addCategory: async (categoryData) => {
    let parent = categoryData.parent;
    categoryData.parentPath = [];
    try {
      if (categoryData.parent == "") {
        categoryData.parent = 0;
      } else {
        for (let i = 0; i < 2; i--) {
          try {
            let response = await categoryModel.findOne({ id: parent });
            if (response.parent == 0) {
              categoryData.parentPath.push(response.id);

              break;
            } else {
              categoryData.parentPath.push(response.id);
              parent = response.parent;
            }
          } catch (error) {
            console.log((message = error));
          }
        }
      }
      const categorySchema = new categoryModel(
        ({ text, parent, parentPath } = categoryData)
      );

      await categorySchema.save();
    } catch (error) {
      console.error(error);
    }
  },

  addSubCategory: async (categoryData) => {
    try {
      // const categorySchema = new categoryModel(({ subCategory } = categoryData));

      await categoryModel.update(
        { category: categoryData.category },
        { $push: { subCategory: categoryData.subCategory } }
      );
    } catch (error) {
      console.error(error);
    }
  },
  getCategory: async () => {
    try {
      let response = await categoryModel.find();
      console.log(response);
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
  getClassroomRequests: async () => {
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
      return response;
    } catch (error) {
      console.log((message = error));
    }
  },
};
