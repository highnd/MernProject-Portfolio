import React, { useState, useEffect } from "react";
import FormInput from "../DesignTools/FormInput";
import SubmitButton from "../DesignTools/SubmitButton";
import Title from "../DesignTools/Title";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Container from "../container/Container";
import { backToAuth, formContainer, formStyle } from "../DesignTools";
import { ImSpinner6 } from "react-icons/im";
import { resetPassword, verifyPasswordReset } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidPassword } from "./Validation";

const ConfirmPassword = () => {
  const [isVerifying, setisVerifying] = useState(true);
  const [isValid, setisValid] = useState(false);
  const [Password, setPassword] = useState({
    One: "",
    Two: "",
  });

  const { updateNotif } = useNotification();
  const navigate = useNavigate();

  const [SearchParams] = useSearchParams();
  const token = SearchParams.get("token");
  const id = SearchParams.get("id");

  const isValidToken = async () => {
    const { err, valid } = await verifyPasswordReset(token, id);
    setisVerifying(false);
    if (err) {
      navigate("/auth/forget-password", { replace: true });
      return updateNotif("error", err);
    }

    if (!valid) {
      setisValid(false);
      return navigate("/auth/forget-password", { replace: true });
    }
    setisValid(true);
  };

  useEffect(() => {
    isValidToken();
  }, []);

  if (isVerifying) {
    return (
      <Container>
        <div className={formContainer}>
          <form
            className={
              formStyle + " flex flex-col gap-4 text-green-600 items-center"
            }
          >
            <p className="text-center text-lg  dark:text-cyan-300">
              Pls wait we are verifying your Token
            </p>
            <ImSpinner6 className="animate-spin" />
          </form>
        </div>
      </Container>
    );
  }

  if (!isValid) {
    return (
      <Container>
        <div className={formContainer}>
          <form className={formStyle}>
            <p className="text-center text-lg dark:text-red-300 dark:font-medium font-bold text-red-500">
              Sorry token is Invalid
            </p>
          </form>
        </div>
      </Container>
    );
  }

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setPassword({ ...Password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Password.One !== Password.Two) {
      updateNotif("error", "Password do not match");
    }
    if (!isValidPassword(Password.One || Password.Two)) {
      updateNotif("error", "Invalid Password ..read the caption");
    }

    const { err, message } = await resetPassword({
      newPassword: Password.One,
      userId: id,
      token,
    });

    if (err) return updateNotif("error", err);

    updateNotif("success", message);
    navigate("/auth", { replace: true });
  };

  return (
    <Container>
      <div className={formContainer}>
        <Title>Confirm Password </Title>
        <form onSubmit={handleSubmit} className={formStyle}>
          <FormInput
            value={Password.One}
            onChange={handleChange}
            label="New Password"
            type="password"
            name="One"
            placeholder={"********"}
          />
          <FormInput
            value={Password.Two}
            onChange={handleChange}
            label="Confirm Password"
            type="password"
            name="Two"
            placeholder={"********"}
          />
          <SubmitButton value="Change Password" />
          <Link to={"/auth"} className={backToAuth}>
            Sign In / Up
          </Link>
          <p className="text-center tracking-wider text-xs text-red-600  mt-6 ">
            "password must be in between 7 to 16 characters which contain only
            characters, numeric digits, underscore and first character must be a
            letter",
          </p>
        </form>
      </div>
    </Container>
  );
};

export default ConfirmPassword;
