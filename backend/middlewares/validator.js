const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const technology = require("../utils/technology");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("password must be 8 to 20 charachter"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("password must be 8 to 20 charachter"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("password is missing!"),
];

exports.devValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("email is invalid"),
  check("gender").trim().not().isEmpty().withMessage("gender is missing"),
  check("skills").trim().not().isEmpty().withMessage("skills is missing"),
  check("about").trim().not().isEmpty().withMessage("about is missing"),

  // check("avatar").trim().not().isEmpty().withMessage("avatar is missing"),
];

exports.articleValidator = [
  check("title").trim().not().isEmpty().withMessage("title is missing"),
  check("about").trim().not().isEmpty().withMessage("about is missing"),
  // check("realeseDate").isDate().withMessage("Date is missing"),
  // check("language").isEmpty().withMessage("language is missing"),
  //
  check("status")
    .isIn(["public", "private"])
    .withMessage("status is missing or wrong"),
  //
  check("technology")
    .isArray()
    .withMessage("technologys is missing or wrong")
    .custom((value) => {
      for (let tech of value) {
        // objTech = JSON.parse(tech);
        // console.log(typeof tech);
        // if (!technology.includes(tech)) throw Error("Invalid Technology");
      }

      return true;
    }),

  //
  check("tags")
    .isArray({ min: 1 })
    .withMessage("minimum of tags is 1")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string") throw Error("type Error of tags");
      }

      return true;
    }),

  check("team")
    .isArray({ min: 1 })
    .withMessage("minimum of team is 1")
    .custom((members) => {
      for (let member of members) {
        // console.log(member);

        if (!isValidObjectId(member.developer)) {
          throw Error("invalid member id!!");
        }

        if (!member.roleAs?.trim()) throw Error("member has no role!!");

        if (typeof member.leader !== "boolean")
          throw Error("enter only true or false!!");
      }

      return true;
    }),

  // check("poster").custom((value, { req }) => {
  //   if (!req.file) throw Error("poster file is missing!!");

  //   return true;
  // }),
];

// all errors coming and fit  here

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.json({ error: error[0].msg });
  }

  next();
};
