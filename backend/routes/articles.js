const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/user");
const { uploadImage } = require("../middlewares/multer");
const {
  createArticle,
  updateArticleInfoOnly,
  removeArticle,
} = require("../controllers/articles");
const { articleValidator, validate } = require("../middlewares/validator");
const { parseData } = require("../utils/helper");

const router = express.Router();

//  api and routes of the app

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  articleValidator,
  validate,
  createArticle
);

router.patch(
  "/update-article-without-poster/:artID",
  isAuth,
  isAdmin,
  parseData,
  articleValidator,
  validate,
  updateArticleInfoOnly
);

router.delete("/:artID", removeArticle);

module.exports = router;
