const express = require("express");

const {
  createUser,
  verfiyEmail,
  resendEmailVarToken,
  forgetPassword,
  sendRePasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/user");
const { isValidPasswordToken } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/verfiy-email", verfiyEmail);
router.post("/resend-verfiy-email", resendEmailVarToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPasswordToken,
  sendRePasswordTokenStatus
);
router.post(
  "/reset-password",
  isValidPasswordToken,
  validatePassword,
  resetPassword
);

module.exports = router;
