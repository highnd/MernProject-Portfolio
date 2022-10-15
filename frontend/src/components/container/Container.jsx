import React from "react";
import authBack from "../../assets/crbg.png";
const Container = ({ children, className }) => {
  return (
    <div className="fixed inset-0 dark:bg-primary z-[-10] bg-cyan-100 flex justify-center items-center  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-0 sm:mt-6 w-full bg-white/80 dark:bg-primary shadow-2xl shadow-blue-900/20 max-w-screen-md sm:h-[560px] h-screen mx-auto overflow-x-hidden">
        <div className=" flex  justify-center items-center pt-12 sm:p-0 p">
          <img
            src={authBack}
            alt="auth-bg"
            className="object-cover sm:h-[470px]  h-[270px] "
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Container;
