import React, { useState } from "react";
import Title from "../DesignTools/Title";
import FormInput from "../DesignTools/FormInput";
import SubmitButton from "../DesignTools/SubmitButton";
import { Link } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { validationUserInfoSignIn } from "./Validation";

const SignIn = () => {
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const { updateNotif } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  console.log(authInfo);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setuserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validationUserInfoSignIn(userInfo);
    if (!ok) return updateNotif("error", error);
    else if (authInfo.error) return updateNotif("error", authInfo.error);
    else {
      handleLogin(userInfo.email, userInfo.password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title>SIGN IN</Title>

      <FormInput
        onChange={handleChange}
        value={userInfo.email}
        label="Email"
        name="email"
        placeholder={"example@gmail.com"}
      />
      <FormInput
        onChange={handleChange}
        value={userInfo.password}
        label="Password"
        name="password"
        placeholder={"********"}
      />

      <div className="flex justify-between dark:text-gray-400 text-black py-2">
        <p className="sm:text-sm text-xs flex ">
          <input type="checkbox" required className="mr-2  cursor-pointer" />
          <p className="mb-[2px]"> Remmeber Me</p>
        </p>
        <Link
          to="/auth/forget-password"
          className="sm:text-sm text-xs dark:text-cyan-400 cursor-pointer dark:hover:text-white hover:text-slate-800 "
        >
          forgot Password?
        </Link>
      </div>
      <SubmitButton value="Sign In" busy={authInfo.isPending} />
    </form>
  );
};

export default SignIn;
