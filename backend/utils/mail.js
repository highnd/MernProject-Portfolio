const nodemailer = require("nodemailer");

exports.generateOTP = (OTP_length = 6) => {
  let OTP = "";
  for (let i = 1; i <= OTP_length; i++) {
    const randomData = Math.round(Math.random() * 9);
    OTP += randomData;
  }

  return OTP;
};

exports.generateEmailTransporter = () => {
  const trs = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });
  return trs;
};
