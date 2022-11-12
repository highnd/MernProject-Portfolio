const express = require("express");
const {
  createDev,
  updateDev,
  removeDev,
  searchDev,
  latestDev,
  singleDev,
} = require("../controllers/developers");
const { isAuth, isAdmin } = require("../middlewares/user");
const { uploadImage } = require("../middlewares/multer");
const { devValidator, validate } = require("../middlewares/validator");

const router = express.Router();

//  api and routes of the app

router.post(
  "/create",

  uploadImage.single("avatar"),
  devValidator,
  validate,
  createDev
);
router.post(
  "/update/:devID",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  devValidator,
  validate,
  updateDev
);

router.delete("/:devID", isAuth, isAdmin, removeDev);
router.get("/search", isAuth, isAdmin, searchDev);
router.get("/latest-developers", isAuth, isAdmin, latestDev);
router.get("/single-dev/:id", singleDev);
module.exports = router;
