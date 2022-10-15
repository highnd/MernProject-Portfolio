import React from "react";

const FormInput = ({ name, placeholder, label, checkError, ...rest }) => {
  return (
    <div className="flex flex-col-reverse dark:text-gray-400 text-black py-2">
      <input
        type={name}
        name={name}
        id={name}
        className={`rounded-md bg-gray-200 mt-2 p-1 outline-none text-black focus:bg-gray-300 peer`}
        placeholder={placeholder}
        {...rest}
      />
      <label htmlFor={name} className="peer-focus:text-cyan-400  w-fit">
        {label}
      </label>
    </div>
  );
};

export default FormInput;
