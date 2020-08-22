import React from "react";
import PropTypes from "prop-types";
import cl from "./InputField.module.scss";
import errorMessageBank from "../ErrorMessageBank";

const InputField = React.forwardRef(function InputField(
  { name, type, placeholder, errors, autocomplete },
  ref
) {
  const errorMessagesByName = errorMessageBank[name];
  const errorType = errors[name]?.type;
  return (
    <div className={cl.container}>
      <label className={cl.label}>{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${cl.input} ${errors[name] ? cl["input-error"] : ""}`}
        ref={ref}
        autoComplete={autocomplete}
      />
      <div className={cl["error-message"]}>
        {errorMessagesByName[errorType]}
      </div>
    </div>
  );
});

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  autocomplete: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  errors: {},
  autocomplete: "on",
};

export default InputField;
