import React from "react";

//CHECK IF SIGN UP IS OKAY : SIGN UP VARIFICATION

export const validationUserInfoSignUp = ({ name, email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidPassword = /^[A-Za-z]\w{7,25}$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid Name" };

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (!isValidPassword.test(password))
    return {
      ok: false,
      error: "Password Invalid Read the Caption",
    };

  return { ok: true, error: "" };
};

//CHECK IF SIGN IN IS OKAY : SIGN IN VARIFICATION

export const validationUserInfoSignIn = ({ email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidPassword = /^[A-Za-z]\w{7,25}$/;

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (!isValidPassword.test(password))
    return {
      ok: false,
      error: "Password Wrong",
    };

  return { ok: true, error: "" };
};

//CHECK IF OTP IS OKAY : OTP VARIFICATION

export const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

//CHECK IF EMAIL IS OKAY : EMAIL VARIFICATION

export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

//CHECK IF PASSWORD IS OKAY : PASSWORD VARIFICATION

export const isValidPassword = (password) => {
  const isValidPassword = /^[A-Za-z]\w{7,25}$/;

  return isValidPassword.test(password);
};
