const path = require("path");
const multer = require("multer");
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const crypto = require("crypto");
const { Module } = require("module");
const { log } = require("console");
let profileImageName = generateFileName();
let certificateImageName = generateFileName();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    file.fieldname == "profileImg"
      ? cb(null, "./public/teacher/uploadImages/profileImages")
      : cb(null, "./public/teacher/uploadImages/certificates");
  },
  filename: (req, file, cb) => {
    if (file.fieldname == "profileImg") {
      cb(null, profileImageName + path.extname(file.originalname));
      req.profileImageExt = path.extname(file.originalname);
    } else {
      cb(null, certificateImageName + path.extname(file.originalname));
      req.certificateImageExt = path.extname(file.originalname);
    }
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
  profileImageName,
  certificateImageName,
};
