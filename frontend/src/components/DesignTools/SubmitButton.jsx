import React from "react";
import { buttonClass } from "./";
import { ImSpinner6 } from "react-icons/im";

const SubmitButton = ({ value, handleSubmit, busy }) => {
  return (
    <button type="submit" className={buttonClass}>
      {busy ? <ImSpinner6 className="animate-spin" /> : value}
    </button>
  );
};

export default SubmitButton;
