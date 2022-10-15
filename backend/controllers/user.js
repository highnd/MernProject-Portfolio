const User = require("../models/user");
const jwt = require("jsonwebtoken");
const EmailVarToken = require("../models/emailVarToken");
const passwordResetToken = require("../models/passwordResetToken");
const { isValidObjectId } = require("mongoose");
const emailVarToken = require("../models/emailVarToken");
const { generateOTP, generateEmailTransporter } = require("../utils/mail");
const { sendError, generateRandomBytes } = require("../utils/helper");

exports.createUser = async (req, res) => {
  const { name, password, email } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return sendError(res, "email is already exist");
  }
  const newUser = new User({ name, email, password });
  await newUser.save();

  //Generate 6 digit otp
  let OTP = generateOTP();
  // store otp inside db
  const newEmailVarToken = new EmailVarToken({
    owner: newUser._id,
    token: OTP,
  });
  //saveing
  await newEmailVarToken.save();

  var transport = generateEmailTransporter();

  transport.sendMail({
    from: "verification@falahWebsite.com",
    to: newUser.email,
    subject: "Email Varification",
    html: `
     <h1>Your varification OTP</h1>
      <h2>fallahWebsiteMovie</h2>
    <h2>${OTP}</h2>
    `,
  });

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.verfiyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid User");

  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found.", 404);
  if (user.isVarified) return sendError(res, "user is already varified");

  const token = await EmailVarToken.findOne({ owner: userId });
  if (!token) return sendError(res, "token not found", 404);

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, "please submit a valid OTP");
  user.isVarified = true;
  await user.save();
  await emailVarToken.findByIdAndDelete(token._id);

  var transport = generateEmailTransporter();

  transport.sendMail({
    from: "verification@falahWebsite.com",
    to: user.email,
    subject: "Welcome to Our WebApp",
    html: `
     <h1 style={{color:"red"}}>Activation succeed</h1>
      <h2>welcome message from mahdi fallah</h2>
    `,
  });
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
      isVarified: user.isVarified,
    },
    message: "your email is verified",
  });
};

exports.resendEmailVarToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found", 404);

  if (user.isVarified)
    return res.json({ error: "this email is already verified" });

  const alreadyToken = await EmailVarToken.findOne({ owner: userId });
  if (alreadyToken)
    return sendError(
      res,
      "only after 5 minute you can request for another token!"
    );

  //Generate 6 digit otp
  let OTP = generateOTP();
  // store otp inside db
  const newEmailVarToken = new EmailVarToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVarToken.save();
  var transport = generateEmailTransporter();

  transport.sendMail({
    from: "verification@falahWebsite.com",
    to: user.email,
    subject: "Email Varification",
    html: `
     <h1 style={color="red"}>Your varification OTP</h1>
      <h2>fallahWebsiteMovie</h2>
    <h2>${OTP}</h2>
    `,
  });
  res.json({ message: "New OTP has been sent to your Email" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email.trim()) return sendError(res, "email is missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "user not found", 404);

  const alreadyHasToken = await passwordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      "only after 5 minutes you can request for another token"
    );

  const token = await generateRandomBytes();
  const newPasswordResetToken = await passwordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/auth/confirm-password?token=${token}&id=${user._id}`;

  var transport = generateEmailTransporter();

  transport.sendMail({
    from: "security@falahWebsite.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
     <h1 style={color="red"}>Your varification OTP</h1>
      <h2>fallahWebsiteMovie</h2>
    <a href='${resetPasswordUrl}'>Change Password</a>
    `,
  });

  res.json({ message: "link sent to your email!/Check your email" });
};

exports.sendRePasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(res, "new password must be diffrent from old one");

  user.password = newPassword;
  await user.save();

  await passwordResetToken.findByIdAndDelete(req.resetToken._id);

  var transport = generateEmailTransporter();

  transport.sendMail({
    from: "security@falahWebsite.com",
    to: user.email,
    subject: "password reset successfully",
    html: `
     <h1 style={"color":"red"}>password reset successfully</h1>
      <h2>fallahWebsiteMovie</h2>
    `,
  });

  res.json({
    message: "password reset successfully, now you can use the new password",
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email or Password  not match");

  //not allow for sign in if email not verrified
  // if (!user.isVarified)
  //   return sendError(res, "you havnt activate your accout yet");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email or Password  not match");

  const { _id, name } = user;

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({
    user: {
      id: _id,
      name: name,
      email: user.email,
      token: jwtToken,
      isVarified: user.isVarified,
    },
  });
};
