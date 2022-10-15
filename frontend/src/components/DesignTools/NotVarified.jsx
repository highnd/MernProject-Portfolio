import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

const NotVarified = () => {
  const { authInfo, isAuth } = useAuth();
  //if user logged in is true
  const { isLoggedIn } = authInfo;
  // if user verifyed his is true
  const isVarified = authInfo.profile?.isVarified;
  const navigate = useNavigate();

  const handleMoveToVarification = () => {
    navigate("/auth/email-varification", {
      state: { user: authInfo.profile },
    });
  };
  return (
    <div>
      {isLoggedIn && !isVarified ? (
        <p className="text-center bg-purple-600/70 p-1  ">
          you havnt activate your account yet?
          <button
            onClick={handleMoveToVarification}
            className=" text-white text-bold underline px-1 mx-1 hover:text-orange-200"
          >
            Active your account Now
          </button>
        </p>
      ) : null}
      hello
    </div>
  );
};

export default NotVarified;
