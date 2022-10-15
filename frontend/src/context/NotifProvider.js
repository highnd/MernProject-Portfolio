import React, { createContext, useState } from "react";

export const NotificationContext = createContext();
let timeOutId;
const NotifProvider = ({ children }) => {
  const [notification, setnotification] = useState("");
  const [classes, setclasses] = useState("");

  const updateNotif = (type, value) => {
    if (timeOutId) clearTimeout(timeOutId);
    switch (type) {
      case "error":
        setclasses("bg-red-500");
        break;
      case "success":
        setclasses("bg-green-500");
        break;
      case "warning":
        setclasses("bg-orange-500");
        break;

      default:
        setclasses("bg-red-500");
        break;
    }
    setnotification(value);

    timeOutId = setTimeout(() => {
      setnotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotif }}>
      {children}
      {notification && (
        <div
          className={` fixed top-20  w-56  rounded-md 
       flex justify-center p-1 items-center  ${classes} text-white  md:left-[45%]  left-8 shadow-xl shadow-gray-400/20 bounce`}
        >
          <p>{notification}</p>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotifProvider;
