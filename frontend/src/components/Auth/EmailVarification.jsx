import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resendEmailVerToken, verifyEmailUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import Container from "../container/Container";
import { backToAuth, otpInput, resendOtp } from "../DesignTools";
import SubmitButton from "../DesignTools/SubmitButton";
import Title from "../DesignTools/Title";
import { isValidOTP } from "./Validation";

const OTP_LENGTH = 6;

const EmailVarification = () => {
  const [OTP, setOTP] = useState(new Array(OTP_LENGTH).fill(""));
  const [OTPindex, setOTPindex] = useState(0);

  const { updateNotif } = useNotification();

  const { authInfo, isAuth } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVarified = profile?.isVarified;

  const inputRef = useRef();

  const navigate = useNavigate();
  const { state } = useLocation();
  const user = state?.user;

  // methods

  const focusNextInputField = (index) => {
    setOTPindex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;

    setOTPindex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOTP = [...OTP];
    newOTP[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);

    setOTP([...newOTP]);
  };

  const handleResendOtp = async () => {
    const { err, message } = await resendEmailVerToken(user.id);

    if (err) return updateNotif("error", err);

    updateNotif("success", message);
  };

  const handleKeyDown = ({ key, target }, index) => {
    const { value } = target;
    if ((key === "Backspace" && !value) || key === "ArrowLeft") {
      focusPrevInputField(index);
    } else if (key === "ArrowRight") focusNextInputField(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(isValidOTP())
    if (!isValidOTP(OTP)) return updateNotif("error", "Invalid OTP");

    const {
      err,
      message,
      user: mainUser,
    } = await verifyEmailUser({
      OTP: OTP.join(""),
      userId: user.id,
    });
    if (err) return updateNotif("error", err);

    updateNotif("success", message);
    localStorage.setItem("auth-token", mainUser.token);
    window.location.reload();
    isAuth();
    setOTP(new Array(OTP_LENGTH).fill(""));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [OTPindex]);

  useEffect(() => {
    if (!user) navigate("/not-Found");

    if (isLoggedIn && isVarified) navigate("/");

    console.log(profile);
  }, [user, isLoggedIn, isVarified]);

  useEffect(() => {
    console.log("verify:", isVarified);
  }, [isVarified]);

  return (
    <>
      <Container>
        <div className="dark:text-white  mx-auto flex flex-col sm:justify-center ">
          <Title>Account Activation </Title>

          <p className="text-center text-sm dark:text-green-400 text-green-700 sm:-mt-1 mt-2 ">
            OTP has sent to your Email
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              {OTP.map((_, index) => (
                <input
                  ref={OTPindex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={OTP[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={otpInput}
                />
              ))}
            </div>
            <SubmitButton value="verify Account" />
            <div className="flex justify-between w-full ">
              <Link to={"/auth"} className={backToAuth}>
                Sign In / Up
              </Link>
              <button
                type="button"
                onClick={handleResendOtp}
                className={resendOtp}
              >
                Send again
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default EmailVarification;
