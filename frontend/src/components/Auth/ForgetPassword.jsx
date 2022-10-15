import React, { useState } from "react";
import FormInput from "../DesignTools/FormInput";
import SubmitButton from "../DesignTools/SubmitButton";
import Title from "../DesignTools/Title";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import { backToAuth, formContainer, formStyle } from "../DesignTools";
import { forgetPassword } from "../../api/auth";
import { isValidEmail } from "./Validation";
import { useNotification } from "../../hooks";

const ForgetPassword = () => {
  const [Email, setEmail] = useState("");

  const { updateNotif } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(Email)) return updateNotif("error", "Invalid Email");
    const { err, message } = await forgetPassword(Email);
    if (err) return updateNotif("error", err);

    updateNotif("success", message);
  };
  return (
    <Container>
      <div className={formContainer}>
        <Title>Reset password </Title>
        <form className={formStyle} onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange}
            value={Email}
            label="Email"
            name="email"
            placeholder={"example@gmail.com"}
          />
          <SubmitButton value="Send Link" />
          <Link to={"/auth"} className={backToAuth}>
            Sign In / Up
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default ForgetPassword;
