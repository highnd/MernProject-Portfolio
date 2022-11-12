import React, { createContext, useState, useEffect } from "react";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

const AuthProvider = ({ children }) => {
  const [Nav, setNav] = useState(false);
  const [authInfo, setauthInfo] = useState({ ...defaultAuthInfo });

  const { updateNotif } = useNotification();

  const handleLogin = async (email, password) => {
    setauthInfo({ ...authInfo, isPending: true });

    const { err, user } = await signInUser({ email, password });
    console.log(err);
    if (err) {
      updateNotif("error", err);
      return setauthInfo({ ...authInfo, isPending: false, error: err });
    }

    setauthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", user?.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");

    if (!token) return;

    setauthInfo({ ...authInfo, isPending: true });
    const { user, err } = await getIsAuth(token);

    if (err) {
      updateNotif("error", err);
      return setauthInfo({ ...authInfo, isPending: false, error: err });
    }

    setauthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");

    setauthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuth();
  }, []);
  //, handleLogout, isAuth
  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogOut, setNav, Nav }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
