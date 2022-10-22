const path = require("path");
const multer = require("multer");
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const crypto = require("crypto");
const { Module } = require("module");
let bannerImageName = generateFileName();
let thumbnailImageName1 = generateFileName();
let thumbnailImageName2 = generateFileName();
let thumbnailImageName3 = generateFileName();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    file.fieldname === "bannerImage"
      ? cb(null, "./public/classroom/bannerImages")
      : cb(null, "./public/classroom/thumbnails");
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "bannerImage") {
      cb(null, bannerImageName + path.extname(file.originalname));
      req.bannerImageExt = path.extname(file.originalname);
    } else if (file.fieldname === "thumbnail1") {
      cb(null, thumbnailImageName1 + path.extname(file.originalname));
      req.thumbnailImage1Ext = path.extname(file.originalname);
    } else if (file.fieldname === "thumbnail2") {
      cb(null, thumbnailImageName2 + path.extname(file.originalname));
      req.thumbnailImage2Ext = path.extname(file.originalname);
    } else if (file.fieldname === "thumbnail3") {
      cb(null, thumbnailImageName3 + path.extname(file.originalname));
      req.thumbnailImage3Ext = path.extname(file.originalname);
    }
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
  bannerImageName,
  thumbnailImageName1,
  thumbnailImageName2,
  thumbnailImageName3,
};
