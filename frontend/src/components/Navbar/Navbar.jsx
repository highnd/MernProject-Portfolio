import React, { useState, useEffect, useRef } from "react";
import { ImSwitch } from "react-icons/im";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import { listItemDesign, logInOut } from "../DesignTools";

const Navbar = () => {
  const { ToggleTheme } = useTheme();
  const boxRef = useRef(null);

  const { authInfo, handleLogOut, setNav, Nav } = useAuth();
  const { isLoggedIn } = authInfo;

  const isAdmin = authInfo.profile?.role === "admin" ? true : false;

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setNav(false);
      } else {
        setNav(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [boxRef]);

  return (
    <article className=" shadow-sm shadow-gray-700 ">
      <div
        ref={boxRef}
        className="flex  justify-between bg-purple-500  p-2  mx-auto overflow-hidden   items-center  z-10  "
      >
        <div className="flex gap-2 items-center justify-between">
          <Link
            to={"/"}
            onClick={() => setNav((prev) => !prev)}
            className="font-bold sm:text-lg text-white"
          >
            LOGO
          </Link>
          <ImSwitch
            className="dark:bg-gray-400/70 bg-white dark:text-white text-black   cursor-pointer m-1 p-1   rounded-full sm:mr-6 "
            size={22}
            onClick={ToggleTheme}
          />
        </div>
        {Nav ? (
          <AiOutlineClose
            onClick={() => setNav((prev) => !prev)}
            className="text-white cursor-pointer md:hidden "
            size={22}
          />
        ) : (
          <AiOutlineMenu
            onClick={() => setNav((prev) => !prev)}
            className="text-white cursor-pointer md:hidden "
            size={22}
          />
        )}

        {/* <div className="flex-row-reverse items-center relative mb-">
            <BiSearchAlt
              size={26}
              className="mx-2 absolute right-0 top-[7px] cursor-pointer text-gray-200"
            />
            <input
              type="text"
              className="  border-2 focus:border-white transition text-white border-dark-subtle p-1  outline-none  rounded bg-transparent"
              placeholder="Search for.."
            />
          </div> */}
        <ul
          className={`text-white  md:flex  text-right md:items-center md:h-auto h-max md:opacity-100  gap-1  md:static absolute md:bg-inherit bg-purple-500   left-0 md:w-auto w-full transition-all ease-in duration-500 ${
            Nav ? "top-10 opacity-100 " : "top-[-300px] opacity-0"
          }`}
        >
          <li
            onClick={() => setNav((prev) => !prev)}
            className={listItemDesign}
          >
            Home
          </li>
          <li
            onClick={() => setNav((prev) => !prev)}
            className={listItemDesign}
          >
            About Us
          </li>
          <li
            onClick={() => setNav((prev) => !prev)}
            className={listItemDesign}
          >
            Developers
          </li>
          <li
            onClick={() => setNav((prev) => !prev)}
            className={listItemDesign}
          >
            Articles
          </li>
          {isLoggedIn && isAdmin ? (
            <Link to={"/dashboard"}>
              <li
                onClick={() => setNav((prev) => !prev)}
                className={listItemDesign}
              >
                Dashboard
              </li>
            </Link>
          ) : null}

          {isLoggedIn ? (
            <li onClick={handleLogOut} className={logInOut}>
              <span onClick={() => setNav((prev) => !prev)}>Log Out</span>
            </li>
          ) : (
            <li>
              <Link to={"/auth"} onClick={() => setNav((prev) => !prev)}>
                <li className={logInOut}>Sign In/Up</li>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
};

export default Navbar;
