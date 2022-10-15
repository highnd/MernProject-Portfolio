import React from "react";

const Title = ({ children }) => {
  return (
    <h1 className="text-3xl  dark:text-white text-black tracking-wider font-bold text-center sm:mb-4">
      {children}
    </h1>
  );
};

export default Title;
