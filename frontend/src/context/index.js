import React from "react";
import AuthProvider from "./AuthProvider";
import NotifProvider from "./NotifProvider";
import ThemeProvider from "./ThemeProvider";

const ContextProviders = ({ children }) => {
  return (
    <NotifProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </NotifProvider>
  );
};

export default ContextProviders;
