import React from "react";
import PropTypes from "prop-types";
import cl from "./InputTextarea.module.scss";
import errorMessageBank from "../../../models/ErrorMessageBank";

const InputTextarea = React.forwardRef(function InputTextarea(
  { name, placeholder, errors, rows, autocomplete, value, disabled },
  ref
) {
  const errorMessagesByName = errorMessageBank[name];
  const errorType = errors[name]?.type;
  return (
    <div className={cl.container}>
      <label className={cl.label} htmlFor="name">
        {placeholder}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className={`${cl.input} ${errors[name] ? cl["input-error"] : ""}`}
        ref={ref}
        autoComplete={autocomplete}
        defaultValue={value}
        disabled={disabled}
      />
      <div className={cl["error-message"]}>
        {errorMessagesByName[errorType]}
      </div>
    </div>
  );
});

InputTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  autocomplete: PropTypes.string,
  rows: PropTypes.string,
  disabled: PropTypes.bool,
};

InputTextarea.defaultProps = {
  placeholder: "",
  errors: {},
  value: "",
  autocomplete: "on",
  rows: "10",
  disabled: false,
};

export default InputTextarea;
