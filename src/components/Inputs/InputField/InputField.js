import React from "react";
import PropTypes from "prop-types";
import cl from "./InputField.module.scss";
import errorMessageBank from "../../../models/ErrorMessageBank";

const InputField = React.forwardRef(function InputField(
  {
    name,
    type,
    placeholder,
    errors,
    autocomplete,
    short,
    value,
    onChange,
    disabled,
  },
  ref
) {
  const errorMessagesByName = errorMessageBank[name] || {};
  const errorType = errors[name]?.type;
  return (
    <div className={`${cl.container} ${short ? cl.short : ""}`}>
      {!short && <label className={cl.label}>{placeholder}</label>}
      <input
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className={`${cl.input} ${errors[name] ? cl["input-error"] : ""}`}
        ref={ref}
        autoComplete={autocomplete}
        onChange={onChange}
        disabled={disabled}
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
  value: PropTypes.string,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  autocomplete: PropTypes.string,
  short: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  errors: {},
  value: undefined,
  autocomplete: "on",
  short: false,
  onChange: () => {},
  disabled: false,
};

export default InputField;
