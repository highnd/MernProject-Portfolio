import React from "react";
import { ImSwitch } from "react-icons/im";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";

const Navbar = () => {
  const { ToggleTheme } = useTheme();

  const { authInfo, handleLogOut } = useAuth();
  const { isLoggedIn } = authInfo;

  console.log(isLoggedIn);

  return (
    <article className="bg-black  shadow-sm shadow-gray-700 ">
      <div className="bg-black p-2 max-w-screen-xl mx-auto overflow-hidden ">
        <div className="flex xs:justify-start  justify-between  items-center ">
          <Link to={"/"} className="font-bold sm:text-lg text-white">
            LOGO
          </Link>

          <ul className="text-white  flex items-center sm:gap-4 gap-1">
            <li>
              <ImSwitch
                className="dark:bg-gray-400/70 bg-white dark:text-white text-black   cursor-pointer m-1 p-1   rounded-full sm:mr-6"
                size={22}
                onClick={ToggleTheme}
              />
            </li>
            <li className="flex items-center relative">
              <BiSearchAlt
                size={26}
                className="mx-2 absolute right-0 cursor-pointer text-gray-200"
              />
              <input
                type="text"
                className="  border-2 focus:border-white transition text-white border-dark-subtle p-1  outline-none  rounded bg-transparent"
                placeholder="Search for.."
              />
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="cursor-pointer sm:text-lg text-xs"
              >
                Log Out
              </button>
            ) : (
              <Link to={"/auth"} className="cursor-pointer sm:text-lg text-xs">
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Navbar;
