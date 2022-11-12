const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isValidPasswordToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || !isValidObjectId(userId))
    return sendError(res, "Invalid Request!");

  const resetToken = await PasswordResetToken.findOne({ owner: userId });

  if (!resetToken)
    return sendError(res, " cant givee Access , Invalid Request!");

  const matched = await resetToken.compareToken(token);
  if (!matched) return sendError(res, " cant give Access ,Invalid Request!");

  req.resetToken = resetToken;

  next();
};

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) return sendError(res, "no token found");
  const jwtToken = token.split("Bearer ")[1];
  console.log(token);
  if (!jwtToken) return sendError(res, "invalid token");

  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "Invalid Token User Not found", 404);

  req.user = user;
  next();
};

exports.isAdmin = (req, res, next) => {
  const { user } = req;

  if (user.role !== "admin") return sendError(res, "Access denied!!");
  next();
};
