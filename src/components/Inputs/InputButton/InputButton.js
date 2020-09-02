import React from "react";
import PropTypes from "prop-types";
import classes from "./InputButton.module.scss";

function InputButton({ type, text }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${classes.button} ${classes["primary-filled"]}`}
    >
      {text}
    </button>
  );
}

InputButton.propTypes = {
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  text: PropTypes.string,
};

InputButton.defaultProps = {
  type: "button",
  text: "",
};

export default InputButton;
