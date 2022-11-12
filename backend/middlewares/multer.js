const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new Error("only images"));
  }
  console.log(file);
  cb(null, true);
};

exports.uploadImage = multer({ storage, fileFilter });
