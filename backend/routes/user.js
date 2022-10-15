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
const { isValidPasswordToken, isAuth } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");

const router = express.Router();

//  api and routes of the app

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
  validatePassword,
  validate,
  isValidPasswordToken,
  resetPassword
);

router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: user.jwtToken,
      isVarified: user.isVarified,
    },
  });
});

module.exports = router;
