import React, { useState } from "react";
import Title from "../DesignTools/Title";
import FormInput from "../DesignTools/FormInput";
import SubmitButton from "../DesignTools/SubmitButton";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { validationUserInfoSignUp } from "./Validation";
import { useNotification } from "../../hooks";

const SignUp = () => {
  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { updateNotif } = useNotification();

  const [errors, seterrors] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setuserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validationUserInfoSignUp(userInfo);
    if (!ok) return updateNotif("error", error) && seterrors(true);

    const { err, user } = await createUser(userInfo);
    if (err) return updateNotif("error", err) && seterrors(true);
    else {
      navigate("/auth/email-varification", {
        state: { user: user },
        replace: true,
      });
      updateNotif("success", "perfect..check your Email");
      seterrors(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title>SIGN UP</Title>

      <FormInput
        value={userInfo.name}
        onChange={handleChange}
        label="Name"
        name="name"
        placeholder={"jhon doe"}
      />
      <FormInput
        value={userInfo.email}
        onChange={handleChange}
        label="Email"
        name="email"
        placeholder={"example@gmail.com"}
      />
      <FormInput
        value={userInfo.password}
        onChange={handleChange}
        label="Password"
        name="password"
        placeholder={"********"}
        type="password"
      />

      <div className="flex  justify-between text-gray-400 py-2">
        <p className="sm:text-sm text-xs flex ">
          <input type="checkbox" required className="mr-2  cursor-pointer" />
          <p className="mb-[2px]"> accept description</p>
        </p>
      </div>
      <SubmitButton value="Sign Up" />
    </form>
  );
};

export default SignUp;
