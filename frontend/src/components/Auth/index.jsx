import SignIn from "./SignIn";

import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Container from "../container/Container";
import { formContainer, formStyle } from "../DesignTools";
import { useAuth } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [checkPage, setcheckPage] = useState(true);
  const navigate = useNavigate();

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div className="fixed inset-0 bg-slate-900 z-[-10]  flex justify-center items-center  ">
      <Container>
        <div className={formContainer}>
          <div className={formStyle}>
            {checkPage ? <SignIn /> : <SignUp />}

            <p className="dark:text-white text-black text-center text-xs p-1 ">
              {checkPage
                ? "you havent an Account? "
                : "already have an Account? "}

              <span
                onClick={() => setcheckPage(!checkPage)}
                className="dark:text-green-400 text-blue-500 cursor-pointer"
              >
                {checkPage ? "  Sign Up" : " Sign In"}{" "}
              </span>
            </p>
          </div>
          {!checkPage && (
            <>
              <p className="text-center tracking-wider text-xs text-red-600 sm:mb-0 sm:mt-0 mx-4 -mt-24  mb-6">
                "password must be in between 7 to 16 characters which contain
                only characters, numeric digits, underscore and first character
                must be a letter",
              </p>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Auth;
